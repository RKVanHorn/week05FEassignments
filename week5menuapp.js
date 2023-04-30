/*create a menu app that uses at least one array, two classes and allows for
create, view and delete*/
/* My idea is an app that lets you keep track of Animal trainers and the animals
they train including their species.*/

class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    describe(){
        return `${this.name} is a ${this.species}`;
    }
}



class Trainer {
    constructor(name) {
        this.name = name;
        this.animals = [];
    }

    addAnimal(animal) {
        if (animal instanceof Animal) {      //Do I need this since you can
            this.animals.push(animal);      //only add Animal through Trainer?
        } else {
            throw new Error `You can only add an instance of Animal.
            Argument is not an animal: ${animal}`;
        }
    }

    describe() { 
      return  this.animals.length == 0 ? `` : this.animals.length>1 ? `${this.name} is currently training ${this.animals.length} animals.` : `${this.name} is currently training ${this.animals.length} animal.`;
    }
}

class Menu {
    constructor() {
        this.trainers = [];
        this.selectedTrainer = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch(selection){
                case '1':
                    this.createTrainer();
                    break;
                case '2':
                    this.viewTrainer();
                    break;
                case '3':
                    this.deleteTrainer();
                    break;
                case '4':
                    this.displayTrainer();
                default:
                    selection = 0;
            }
        selection = this.showMainMenuOptions();
        }
        alert('Training Complete!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create a new Trainer
        2) View a Trainer
        3) Delete a Trainer
        4) Display all Trainers
        `);
    }

    showTrainerMenuOptions(trainerInfo) {
        return prompt(`
        0) Back
        1) Add a new Animal
        2) Delete an Animal
        -------------------
        ${trainerInfo}
        `);
    }

    displayTrainer() {
        //I wanted to see a list of the trainers so I wouldn't have to remember 
        //each one's index and I wanted it to start at 1 and not 0.
    
        let trainerString = '';
        // for (let i = 0; i < this.trainers.length; i++) {
        //     trainerString += (i+1) + ') ' + this.trainers[i].name +
        //     ' is currently training ' + this.trainers[i].animals.length + ' animals.' + '\n';
        // } 
        //Want to make this shorter try .forEach
        this.trainers.forEach((trainer, index) => {
            trainerString += trainer.animals.length == 0 || trainer.animals.length>1 ? `${index +1}) ${trainer.name} is currently training ${trainer.animals.length} animals.` +"\n" 
            : `${index +1}) ${trainer.name} is currently training ${trainer.animals.length} animal.` +"\n";
            //`${index +1}) ${trainer.name} is currently training ${trainer.animals.length} animal(s)` +"\n"  
        })
        alert(trainerString);
    }

    createTrainer() {
        let name = prompt `Enter the name of the trainer: `;
        this.trainers.push(new Trainer(name));
    }

    viewTrainer(){
        //again with the list that starts at 1 instead of 0 like the index
        let listOfTrainers = ``;
        this.trainers.forEach((trainer, index) => {
            listOfTrainers +=  `${index + 1}) ${trainer.name}
        `;
        })
        let index = prompt(`
        Enter the number of the trainer that you want to view:
        ${listOfTrainers}
            `); 
        if(index > -1 && index < (this.trainers.length + 1)) {
            this.selectedTrainer = this.trainers[(index - 1)];
            let description = `Trainer Name: ${this.selectedTrainer.name}
            `;
            description += `${this.selectedTrainer.describe()}
            `;
            for (let i = 0; i < this.selectedTrainer.animals.length; i++){
                description += `${i + 1}) ${this.selectedTrainer.animals[i].describe()}
            `;
            }
            let selection = this.showTrainerMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createAnimal();
                    break
                case '2':
                    this.deleteAnimal();
            }
        } 
    }

    deleteTrainer(){ //I wanted that list starting from 1 again
        let delListOfTrainers = ``;
        this.trainers.forEach((trainer, index) => { //put +1 after index
            delListOfTrainers +=  `${index + 1}) ${trainer.name} 
        `;  
        })
        let index = prompt(`
        Enter the number of the trainer that you wish to delete:
        ${delListOfTrainers} 
            `);
        if (index > -1 && index < (this.trainers.length + 1)) {
            this.trainers.splice((index - 1),1);
        }
    }

    createAnimal(){
        let name = prompt(`Enter the name of the animal that needs training:`);
        let species = prompt(`Enter the species of the animal: `);
        this.selectedTrainer.addAnimal(new Animal(name, species));
    }

    deleteAnimal(){
        let listOfAnimals = ``;
        this.selectedTrainer.animals.forEach((animal, index) => {
            listOfAnimals +=  `${index + 1}) ${animal.name}
        `;
        })
        let index = prompt(`
        Enter the number of the animal that you wish to delete: 
        ${listOfAnimals}
        `);
        if(index > -1 && index < (this.selectedTrainer.animals.length + 1)) {
            this.selectedTrainer.animals.splice((index - 1),1);
        }
    }
}
let menu = new Menu();
menu.start();