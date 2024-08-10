import inquirer from "inquirer"
import chalk from "chalk"

class Student{
    name: string
    constructor(n: string){
        this.name = n
    }
}

class Person{
    students:Student[]=[]
    addStudent(obj:Student){
        this.students.push(obj)
    }
}

const persons = new Person()

const programStart = async(persons: Person) => {
    console.log(chalk.bgCyanBright.bold(`\n ***** WELCOME! ***** \n`));
        do {
             const ans = await inquirer.prompt(
                 {
                    name : "select",
                    type: "list",
                    message: chalk.blueBright.bold("To whom would you like to intract with"),
                    choices: ["staff" , "student" , "exit"]
                 }
        )
        if(ans.select == "staff"){
            console.log(chalk.greenBright.bold("you approch the staff room. kindly, feel free to ask any Question"));
        }
        else if(ans.select == "student"){
            const ans = await inquirer.prompt(
                    {
                        name : "student",
                        type: "input",
                        message: chalk.blueBright.bold("Enter the student's name you wish to engage with")
                    }
            )
            const student = persons.students.find(val => val.name == ans.student)
            if(!student){
                const name = new Student(ans.student)
                persons.addStudent(name)
                console.log(chalk.magentaBright.bold(`Hello i am ${name.name}. Nice to meet you! :)`));
                console.log(chalk.yellowBright.bold.italic("New student added"));
                console.log(chalk.greenBright.bold.underline("Current Student list:"));
                console.log(persons.students);
            }
            else {
                console.log(chalk.magentaBright.bold.italic(`Hello i am ${student.name}. Nice to see you Again! :)`));
                console.log(chalk.underline.bold.greenBright("Existing student list:"));
                console.log(persons.students);
            }
        } 
        else if(ans.select == "exit"){
            console.log(chalk.redBright.bold(`Exiting the program..... \n Thank You:-)`));
            process.exit()
        }     
}
while(true)
}

programStart(persons)