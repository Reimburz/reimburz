from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

def calculate_reimbursement_breakdown(annual_ctc, monthly_ctc, total_days, lop_days):
    if monthly_ctc is None:
        monthly_ctc = annual_ctc / 12

    if monthly_ctc < 200000:
        total_reimburse_amount = monthly_ctc * 0.2
    else:
        total_reimburse_amount = monthly_ctc * 0.15

    if total_reimburse_amount > 50000:
        total_reimburse_amount = 50000

    final_reimburse_amount = total_reimburse_amount * (total_days - lop_days) / total_days

    return final_reimburse_amount, monthly_ctc

def calculate_conv_reimbursement(total_reimburse_amount):
    conv_reimbursement_limit = min(23000, 0.6 * total_reimburse_amount)
    return conv_reimbursement_limit

def calculate_telcom_reimbursement():
    return min(2000, 2000)

def calculate_meal_reimbursement(total_reimburse_amount, conv_reimbursement, telcom_reimbursement):
    meal_reimbursement_balance = total_reimburse_amount - conv_reimbursement - telcom_reimbursement
    return meal_reimbursement_balance

@app.route('/', methods=['GET', 'POST'])  # Allow both GET and POST requests
def handle_request():
    if request.method == 'POST':
        data = request.get_json()
        annual_ctc = data.get('annual_ctc', 0)
        monthly_ctc = data.get('monthly_ctc')  # Allow None for automatic calculation
        total_days = data.get('total_days', 0)
        lop_days = data.get('lop_days', 0)

        try:
            total_reimburse_amount, monthly_ctc_result = calculate_reimbursement_breakdown(annual_ctc, monthly_ctc, total_days, lop_days)
            conv_reimbursement = calculate_conv_reimbursement(total_reimburse_amount)
            telcom_reimbursement = calculate_telcom_reimbursement()
            meal_reimbursement = calculate_meal_reimbursement(total_reimburse_amount, conv_reimbursement, telcom_reimbursement)

            result = {
                'total_reimburse_amount': total_reimburse_amount,
                'monthly_ctc': monthly_ctc_result,
                'conv_reimbursement': conv_reimbursement,
                'telcom_reimbursement': telcom_reimbursement,
                'meal_reimbursement': meal_reimbursement
            }

            return jsonify({'result': result})
        except ValueError as e:
            return jsonify({'error': str(e)}), 400

    elif request.method == 'GET':
        # Handle GET requests if needed
        return jsonify({'message': 'GET request received'})

if __name__ == '__main__':
    app.run(debug=True)
