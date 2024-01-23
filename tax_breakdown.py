from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def calculate_reimbursement(annual_ctc, total_days, lop_days):
    monthly_ctc = annual_ctc / 12

    if monthly_ctc < 200000:
        total_reimburse_amount = monthly_ctc * 0.2
    else:
        total_reimburse_amount = monthly_ctc * 0.15

    if total_reimburse_amount > 50000:
        total_reimburse_amount = 50000

    final_reimburse_amount = total_reimburse_amount * (total_days - lop_days) / total_days

    return final_reimburse_amount

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    annual_ctc = float(data.get('annual_ctc', 0))
    total_days = int(data.get('total_days', 31))
    lop_days = int(data.get('lop_days', 0))

    final_reimburse_amount = calculate_reimbursement(annual_ctc, total_days, lop_days)

    return jsonify({'final_reimburse_amount': final_reimburse_amount})

if __name__ == '__main__':
    app.run(debug=True)
