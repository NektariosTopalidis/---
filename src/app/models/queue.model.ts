import { Process } from "./process.model";

interface queueInterface<Type> {
    enQueue(dataItem: Type,moreThanOneProcessAdded: boolean): void;
    deQueue(): Type | undefined;
    isEmpty(): boolean;
    isFull(): boolean;
    size(): number;
    printQueue(): void;
    preAssign(dataItem: Type,index: number): void;
 }
 
export class Queue<Type> implements queueInterface<Type> {
    private QueueData: Array<Type> = [];
    private maxSize: number = 0;
 
    constructor(length: number) {
       this.maxSize = length;
    }
    isEmpty(): boolean {
       let result = this.QueueData.length <= 0;
       return result;
    }
    isFull(): boolean {
       let result = this.QueueData.length >= this.maxSize;
       return result;
    }
    preAssign(dataItem: Type,index: number): Type | undefined {
      for(let i = index;i<this.size();i++){
         if(this.QueueData[i+1]){
            console.log(this.QueueData[i]);
            
            this.QueueData[i] = this.QueueData[i+1];
         }
         else{
            this.QueueData[i] = dataItem;
         }
      }
      return;  
    }
    enQueue(dataItem: any,moreThanOneProcessAdded: boolean): void {
       if (this.isFull()) {
            console.log("The queue is full!");
       } else {
            this.QueueData.unshift(dataItem);
            
            this.QueueData.sort((a: any,b: any) => (a.priority > b.priority? -1 : 1 ));
            if(moreThanOneProcessAdded) 
               this.QueueData.sort((a: any,b: any) => (a.priority === b.priority && b.priority === dataItem.priority && a.arrivalTime > b.arrivalTime? -1 : 1 ));
       }
    }
 
    deQueue(): Type | undefined {
       if (this.isEmpty()) {
          console.log("The Queue is empty! There is no element to pop-out");
          return;
       } else {
          var element = this.QueueData.pop();
          return element;
       }
    }
 
    size(): number {
       let len = this.QueueData.length;
       return len;
    }

    get head(){
        return this.QueueData[this.QueueData.length-1];
    }

    get data(){
      return this.QueueData;
    }

    printQueue(): void {
       for (let i = 0; i < this.QueueData.length; i++) {
          console.log(this.QueueData[i]);
       }
    }
 }