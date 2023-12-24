import { Process } from "./process.model";

interface queueInterface<Type> {
    enQueue(dataItem: Type): void;
    deQueue(): Type | undefined;
    isEmpty(): boolean;
    isFull(): boolean;
    size(): number;
    printQueue(): void;
    preAssign(dataItem: Type): void;
    sort(samePriorityWithHeadExists: boolean): void;
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
    preAssign(dataItem: Type): Type | undefined {
      this.QueueData.unshift(dataItem);
      return;  
    }
    enQueue(dataItem: Type): void {
       if (this.isFull()) {
            console.log("The queue is full!");
       } else {
            this.QueueData.push(dataItem);
       }
    }

    sort(samePriorityWithHeadExists: boolean): void{
      if(samePriorityWithHeadExists){
         this.QueueData.sort((a: any,b: any) => (a.priority >= b.priority? -1 : 1 ));
      }
      else{
         this.QueueData.sort((a: any,b: any) => (a.priority > b.priority? -1 : 1 ));
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