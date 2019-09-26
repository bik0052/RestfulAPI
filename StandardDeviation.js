class StandardDeviation{
  constructor (xNumbers){
    this.allXNumbers = xNumbers
    this.allXMinusMean = []
    this.allXMinusMeanSquared = []
    this.sumOfAllXNumbers = 0
    this.xAverage = 0
    this.sumOfAllXMinusMeanSquared = 0
    this.standardDeviation = 0
  }

  init(){
    this.sumOfAllXNumbers = this.sumNumbers(this.get('allXNumbers'))
    this.xAverage = this.calculateAverage(this.get('sumOfAllXNumbers'),this.get('allXNumbers').length)
    this.allXMinusMean = this.calculateAllXMinusMean(this.get('allXNumbers'),this.get('xAverage'))
    this.allXMinusMeanSquared = this.squareNumbers(this.get('allXMinusMean'))
    this.sumOfAllXMinusMeanSquared = this.sumNumbers(this.get('allXMinusMeanSquared'))
    this.standardDeviation = this.calculateStandardDevation(this.get('sumOfAllXMinusMeanSquared'),this.get('allXNumbers').length)
    return this
  }

  sumNumbers(numbers){
    let sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue)
    return sum
  }

  calculateAverage(sum,totalNumbers){
    return (sum/totalNumbers)
  }

  calculateAllXMinusMean(numbers,average){
    let allXMinusMean = []
    for(let aNum of numbers){
      allXMinusMean.push(aNum - average)
    }
    return allXMinusMean
  }

  squareNumbers(numbers){
    let squaredNumbers = numbers.map( aNum => aNum*aNum)
    return squaredNumbers
  }

  calculateStandardDevation(sum,totalNumbers){
    let standardDeviation = Math.sqrt(sum/(totalNumbers-1))
    return standardDeviation
  }

  get(property){
    return this[property]
  }

  set(property,value){
    this[property] = value
  }
  
}

module.exports = StandardDeviation