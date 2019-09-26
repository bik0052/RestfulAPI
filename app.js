var http = require('http')
const StanDev = require('./StandardDeviation')
const LinReg = require('./LinearRegression')
var server = http.createServer(function(request, response) {
  //Instruction for the application.
  let instructions = '<p>For Standard Deviation after \'/\' add \'?\' followed by a s and than add numbers seperated by \',\' \n i.e. http://localhost:8000/?s11,22,33,1,50,60</p> \n <p>For Linear Regression after \'/\' add \'?\' followed by a l enter the first set of number seperated by \',\' and to enter a second set of numbers add \'?\' followed by second set of numbers seperated by \',\' \n i.e. http://localhost:8000/?l51,22,33?1,50,60</p>'


  //If the user is on the '/' send instruction to the user.
  if(request.url === '/'){
    response.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
    response.write(instructions)
    response.end()
  }
  
  console.log(request.url)

  response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})

  let posCalculateWhat = (request.url.indexOf('?') + 1)
  let calculateWhat = request.url.charAt(posCalculateWhat)
  let dataStart = request.url.indexOf('?') + 2
  let dataString = request.url.slice(dataStart)

    if(calculateWhat ==='s'){

      let arrayOfStrings = dataString.split(',')
      // convert to numbers
      let arrayOfXNumbers = arrayOfStrings.map(s => Number(s))
      
      let result = new StanDev(arrayOfXNumbers).init()
      result = {
        Mean:result.xAverage,StandardDeviation:result.standardDeviation
      }
      result = JSON.stringify(result)
      response.write(result)

    } else if(calculateWhat ==='l'){

      let stopData = dataString.indexOf('?')

      let xDataString = dataString.slice(0,stopData)
      
      let yDataString = dataString.slice(dataString.indexOf('?') + 1)
      
      let arrayOfXStrings = xDataString.split(',')
      let arrayOfYStrings = yDataString.split(',')

      let arrayOfXNumbers = arrayOfXStrings.map(s => Number(s))
      let arrayOfYNumbers = arrayOfYStrings.map(s => Number(s))

      let result = new LinReg(arrayOfXNumbers,arrayOfYNumbers).init()
      result = {
        Beta0:result.beta0,
        Beta1:result.beta1
      }
      result = JSON.stringify(result)
      response.write(result)

    }

    response.end()
  })
  console.log('Listning on port 8000 \n \n For instructions visit http://localhost:8000/')
  server.listen(8000);
	