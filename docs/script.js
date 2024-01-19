let $ = function (id) { return document.getElementById(id) }

function processEntry()
{
    let income = $("income").value;
    let message;
    if (income > 0)
    {
        income = parseFloat(income);
        message = "$" + calculateTax(income).toFixed(2);
    }
    else if (isNaN(income))
    {
        alert("Error: Entry is invalid. Please enter a number.");
        message = "Please enter a number for your income.";
    }
    else
    {
        alert("Error: Entry is invalid. Please enter a number greater than zero.");
        message = "Your income must be greater than zero.";
    }
    $("owed").textContent = message;
}

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
}
