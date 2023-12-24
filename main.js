import inquirer from "inquirer";
// User Data
let userName = "admin";
let userPin = 2132;
let Balance = 10000;
/* --------------------------------------------------------------------------------------------------------------------------------------- */
/* User Dashboard */
async function userDashboard(userName) {
    console.log("You are successfully authenticated...");
    let options = await inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: `Hello ${userName}, What do you want to perform today?`,
            choices: [
                {
                    name: "Cash Withdrawal",
                    value: "cashWithdraw",
                },
                {
                    name: "Check your Balance",
                    value: "balance",
                },
                {
                    name: "Cancel Transaction",
                    value: "cancelTrans",
                },
            ],
        },
    ]);
    if (options.option === "cashWithdraw") {
        console.log("Great! How much cash do you want?");
        let cashOptions = await inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: `Hello ${userName}, What do you want to perform today?`,
                choices: [
                    {
                        name: "$5000",
                        value: 5000,
                    },
                    {
                        name: "$10000",
                        value: 10000,
                    },
                    {
                        name: "$20000",
                        value: 20000,
                    },
                    {
                        name: "$25000",
                        value: 25000,
                    },
                    {
                        name: "Other amount",
                        value: "otherAmount",
                    },
                ],
            },
        ]);
        if (typeof cashOptions.option === "number") {
            if (cashOptions.option <= Balance) {
                console.log(`Here's Your $${cashOptions.option}, Have a great day`);
                Balance = Balance - cashOptions.option;
                printReceipt(userName, Balance);
            }
            else {
                console.log("Insufficient balance");
            }
        }
        else if (cashOptions.option === "otherAmount") {
            let otherAmount = await inquirer.prompt([
                {
                    type: "number",
                    name: "amountInput",
                    message: "Please enter your amount...",
                },
            ]);
            if (otherAmount.amountInput <= Balance) {
                console.log(`Here's Your $${otherAmount.amountInput}, Have a great day`);
                Balance = Balance - otherAmount.amountInput;
                printReceipt(userName, Balance);
            }
            else {
                console.log("Insufficient balance");
            }
        }
    }
    if (options.option === "balance") {
        printReceipt(userName, Balance);
    }
    if (options.option === "cancelTrans") {
        console.log("Thank you for banking with us");
    }
}
/* --------------------------------------------------------------------------------------------------------------------------------------------- */
/* Print Receipt */
function printReceipt(userName, remainingBalance) {
    let receipt = {
        Bank: "ABC Bank",
        UserName: userName,
        RemainingBalance: remainingBalance,
    };
    console.log(receipt);
}
/* --------------------------------------------------------------------------------------------------------------------------------------------- */
/* Authenticate User */
async function authenticateUser() {
    let auth = await inquirer.prompt([
        {
            type: "input",
            name: "userName",
            message: "Please Enter your UserName...",
        },
        {
            type: "password",
            name: "userPin",
            message: "Please enter your secret number...",
        },
    ]);
    if (auth.userName === userName && Number(auth.userPin) === userPin) {
        userDashboard(auth.userName);
    }
    else {
        console.log("Incorrect information provided");
    }
}
/* --------------------------------------------------------------------------------------------------------------------------------------------- */
authenticateUser();
