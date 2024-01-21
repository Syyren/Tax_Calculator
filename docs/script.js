let $ = function (id) { return document.getElementById(id) };

function processEntry(input, output)
{
    let income = $(input).value;
    let message;
    let Dollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    if (income > 0)
    {
        message = 'You will owe: ' + Dollar.format(calculateTax(parseFloat(income)));
    }
    else if (isNaN(income))
    {
        message = 'Please enter a number for your income.';
    }
    else
    {
        message = 'Please enter a number greater than zero.';
    }
    $(output).textContent = message;
};

function calculateTax(income)
{
    const BRKTS = [9225, 37450, 90750, 189300, 411500, 413200, 0];
    const BRKT_TAXES = [0.10, 0.15, 0.25, 0.28, 0.33, 0.35, 0.396];
    let amountOwed = 0, remainder = 0;
    for (let i in BRKTS)
    {
        remainder = income - BRKTS[i]
        if (remainder < 0 || remainder == income)
        {
            amountOwed += (income * BRKT_TAXES[i]);
            break;
        }
        else
        {
            amountOwed += ((income - remainder) * BRKT_TAXES[i]);
            income = remainder;
        }
    }
    return amountOwed;
};