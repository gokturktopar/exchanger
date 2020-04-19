

const https = require('https')
const convert=(baseCurrency,targetCurrency,quantity,date)=>{
    if(!Number.isInteger(quantity))
        quantity=1
    let endpoint='https://api.exchangeratesapi.io/'
    if(date)
    {
        endpoint+=date+'/?base='+baseCurrency+'&symbols='+targetCurrency
    }
    else{//today
        endpoint+='latest?base='+baseCurrency+'&symbols='+targetCurrency
    }
    https.get(endpoint, function(res){
                    let body = '';
                    res.on('data', function(chunk){
                        body += chunk;
                    });
                
                    res.on('end', function(){
                        const response = JSON.parse(body);
                        if(response.error){
                            console.log(response.error);
                        }
                        else{
                            console.log(quantity*response.rates[targetCurrency]);
                        }
                    });
                }).on('error', function(e){
                    console.log("Got an error: ", e);
                });
    }

    convert('EUR','USD',100,'2020-02-4')