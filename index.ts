import { faker } from "@faker-js/faker";
import inquirer from "inquirer";
import chalk from "chalk";

// class of customer
class customer {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  mobNumber: number;
  accNumber: number;

  constructor(
    fName: string,
    lName: string,
    age: number,
    gender: string,
    mob: number,
    acc: number
  ) {
    this.firstName = fName;
    this.lastName = lName;
    this.age = age;
    this.gender = gender;
    this.mobNumber = mob;
    this.accNumber = acc;
  }
}

//bank acc interface
interface bankAccount {
  accNumber: number;
  balance: number;
}

//class of bank
class bank {
  customer: customer[] = [];
  account: bankAccount[] = [];

  addCustomer(obj: customer) {
    this.customer.push(obj);
  }

  addAccountNumber(obj: bankAccount) {
    this.account.push(obj);
  }
  transaction(accObj: bankAccount) {
    let NewAccounts = this.account.filter(
      (acc) => acc.accNumber !== accObj.accNumber
    );
    this.account = [...NewAccounts, accObj];
  }
}

let myBank = new bank();

//customer create
const cus = new customer("Aiman", "Tahir", 22, "female", 923423447, 10010);

myBank.addCustomer(cus);
myBank.addAccountNumber({ accNumber: cus.accNumber, balance: 10000 });

// console.log(myBank)

//bank functionality

async function bankService(bank: bank) {
 do{
    let service = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "plz select your choice",
        choices: ["view balance", "cash withdraw", "cash deposit","Exit"],
      });
      // view balance
      if (service.select == "view balance") {
        let res = await inquirer.prompt({
          type: "input",
          name: "num",
          message: "plz enter your acc numb",
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.num);
        if (!account) {
          console.log(chalk.red.bold.italic("invalid account number"));
        }
        if (account) {
          let name = myBank.customer.find(
            (item) => item.accNumber == account.accNumber
          );
          console.log(
            `dear ${chalk.green.italic(
              name?.firstName
            )} your account balance is ${chalk.bold.blueBright(
              `RS ${account.balance}`
            )} `
          );
        }
    
        //cash witdraw
      }
      if (service.select == "cash withdraw") {
        let res = await inquirer.prompt({
          type: "input",
          name: "num",
          message: "plz enter your acc numb",
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.num);
        if (!account) {
          console.log(chalk.red.bold.italic("invalid account number"));
        }
        if (account) {
          let ans = await inquirer.prompt({
            type: "number",
            message: "plx enter your ammount",
            name: "rupee",
          });
          if (ans.rupee > account.balance) {
            console.log(chalk.red.bold("you don't have enough money to withdraw"));
          }
          let newBalance = account.balance - ans.rupee;
          bank.transaction({ accNumber: account.accNumber, balance: newBalance });
        }
      }
    
      // cash deposit
      if (service.select == "cash deposit") {
        let res = await inquirer.prompt({
          type: "input",
          name: "num",
          message: "plz enter your acc numb",
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.num);
        if (!account) {
          console.log(chalk.red.bold.italic("invalid account number"));
        }
        if (account) {
          let ans = await inquirer.prompt({
            type: "number",
            message: "plx enter your ammount",
            name: "rupee",
          });
          let newBalance = account.balance + ans.rupee;
          bank.transaction({ accNumber: account.accNumber, balance: newBalance });
    
          console.log(newBalance);
        }
      }
      if (service.select == "Exit"){

    return;
      }
 } 
 while(true)
}
bankService(myBank);
