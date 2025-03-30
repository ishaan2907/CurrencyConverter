import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  amount: number  = 0;
  result: number = 0;
  from: string = ""
  to: string = ""
  visible = false
  exchangeRate: any = null;
  loading = false

  constructor(private http: HttpClient) { }

  getExchangeRate(baseCurrency: string) {
    this.loading = true;
    const url = `https://v6.exchangerate-api.com/v6/4c3edf481813dc3e56ec3ffb/latest/${baseCurrency}`
    this.http.get<any>(url).subscribe((data) => {
      console.log(data);
      this.exchangeRate = data.conversion_rates;
      this.loading = false
      if (this.exchangeRate && this.exchangeRate[this.to]) {
        this.result = this.amount * this.exchangeRate[this.to]
        this.visible = true
      }

    })
  }

  convert(val: number, val1: string, val2: string) {
    if (val1 === "" || val2 === "") {
      this.visible = false;
      return;
    }
    this.amount = val;
    this.from = val1;
    this.to = val2;
    this.getExchangeRate(this.from);
    if (this.exchangeRate && this.exchangeRate[this.to]) {
      this.result = this.amount * this.exchangeRate[this.to]
      this.visible = true
    }
    else{
      this.getExchangeRate(this.from)
    }
  }


  // convert(val:number, val1:string, val2:string){
  //   this.amount = val
  //   this.to = val2;
  //   this.from=val1;
  //   console.log(this.amount);
  //   console.log(this.from);
  //   console.log(this.to);

  //   if(val1 == "USD"){
  //     if(val2 == "INR"){
  //       this.result = this.amount*87;
  //     }
  //     else if(val2 == "CNY"){
  //       this.result = this.amount*7.23;
  //     }
  //     else if(val2 == "EUR"){
  //       this.result = this.amount*0.92;
  //     }
  //     else{
  //       this.result = this.amount;
  //     }
  //   }
  //   if(val1 == "INR"){
  //     if(val2 == "USD"){
  //       this.result = this.amount*0.011;
  //     }
  //     else if(val2 == "CNY"){
  //       this.result = this.amount*0.083;
  //     }
  //     else if(val2 == "EUR"){
  //       this.result = this.amount*0.011;
  //     }
  //     else{
  //       this.result = this.amount;
  //     }
  //   }
  //   if(val1 == "CNY"){
  //     if(val2 == "INR"){
  //       this.result = this.amount*12.01;
  //     }
  //     else if(val2 == "USD"){
  //       this.result = this.amount*0.14;
  //     }
  //     else if(val2 == "EUR"){
  //       this.result = this.amount*0.13;
  //     }
  //     else{
  //       this.result = this.amount;
  //     }
  //   }
  //   if(val1 == "EUR"){
  //     if(val2 == "INR"){
  //       this.result = this.amount*94.29;
  //     }
  //     else if(val2 == "CNY"){
  //       this.result = this.amount*7.84;
  //     }
  //     else if(val2 == "USD"){
  //       this.result = this.amount*1.08;
  //     }
  //     else{
  //       this.result = this.amount;
  //     }
  //   }
  //   if(this.from == "" || this.to == ""){
  //     this.visible = false;
  //   }
  //   else{
  //     this.visible = true;
  //   }

  // }
  reset() {

    this.visible = false
    this.amount = 0
    this.to = ""
    this.from = ""
    this.exchangeRate = null;

  }
}
