const StandardDeviation = require('./StandardDeviation')
class LinearRegression extends StandardDeviation {
  constructor(xNumbers,yNumbers){
    super(xNumbers)
    this.allYNumbers = yNumbers
    this.allXTimesY = []
    this.allXSquared = []
    this.sumOfAllYNumbers = 0
    this.sumOfAllXTimesY = 0
    this.sumOfAllXsquared = 0
    this.yAverage = 0
    this.beta1 = 0
    this.beta0 = 0
    this.size = 0
  }

  init(){
    super.sumOfAllXNumbers = super.sumNumbers(super.get('allXNumbers'))
    this.sumOfAllYNumbers = super.sumNumbers(super.get('allYNumbers'))
    super.xAverage = super.calculateAverage(super.get('sumOfAllXNumbers'),super.get('allXNumbers').length)
    this.yAverage = super.calculateAverage(super.get('sumOfAllYNumbers'),super.get('allYNumbers').length)
    this.allXTimesY = this.calculateXTimesY(super.get('allXNumbers'),super.get('allYNumbers'))
    this.sumOfAllXTimesY = super.sumNumbers(super.get('allXTimesY'))
    this.allXSquared = super.squareNumbers(super.get('allXNumbers'))
    this.sumOfAllXsquared = super.sumNumbers(super.get('allXSquared'))
    this.beta1 = this.calculateBeta1(super.get('sumOfAllXTimesY'), super.get('xAverage'),
      super.get('yAverage'), super.get('sumOfAllXsquared'), super.get('allXNumbers').length)
    this.beta0 = this.calculateBeta0(super.get('beta1'),super.get('xAverage'),super.get('yAverage'))
    this.size = this.calculateSize(super.get('beta0'), super.get('beta1'),super.get('xAverage'))
    return this
  }

  calculateXTimesY(xNumbers,yNumbers){
    let xTimesY = []
    for(let count = 0;count < xNumbers.length;count++){
      xTimesY.push(xNumbers[count]*yNumbers[count])
    }
    return xTimesY
  }

  calculateBeta1(sumXY,xAvg,yAvg,sumXSquared,totalNumbers){
    let beta1 = (sumXY-totalNumbers*xAvg*yAvg)/(sumXSquared-totalNumbers*xAvg*xAvg)
    return beta1
  }

  calculateBeta0(beta1,xAvg,yAvg){
    let beta0 = yAvg-beta1*xAvg
    return beta0
  }

  calculateSize(beta0,beta1,xAvg){
    let size = beta0 + beta1 * xAvg
    return size
  }
  
}
module.exports = LinearRegression