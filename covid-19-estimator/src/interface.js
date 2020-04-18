import covid19ImpactEstimator from './estimator';
const React = require('react');

class Display extends React.Component {
    constructor() {
        super();
        this.state = {
            reportedCases: "",
            population: "",
            periodType: "",
            timeToElapse: "",
            totalHospitalBeds: "",
            impact: "",
            severeImpact: "",
            region: {
                name: 'Africa',
                avgAge: 19.7,
                avgDailyIncomeInUSD: 5,
                avgDailyIncomePopulation: 0.71
              }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        const input = {
            region: this.state.region,
            population: Number(this.state.population),
            timeToElapse: Number(this.state.timeToElapse),
            periodType: this.state.periodType,
            totalHospitalBeds: Number(this.state.totalHospitalBeds),
            reportedCases: Number(this.state.reportedCases)
        };
        const result = covid19ImpactEstimator(input);
        const {impact, severeImpact} = result;

        this.setState({
            impact: impact,
            severeImpact: severeImpact
        });
    }

    render() {
        return(
            <div>
                <header className="m-auto text-light bg-info font-weight-bold rounded mt-4" style={{width: "50%"}}>COVID-19 ESTIMATOR</header>
                <div className="row m-auto" style={{width: "90%"}}>
                    <div className="container col-sm-4 mt-4">
                        <div className="container bg-primary radius text-light font-weight-bold">CURRENT COVID-19 STATISTICS</div>
                        <form className="form-control text-primary font-weight-bold" onSubmit={this.handleSubmit}>
                            <div className ="form-group">
                                <label className="form-inline" for="population">Total Population</label>
                                <input className="form-control" type="number" id="population" name="population" data-population required onChange={this.handleChange}/>
                                
                            </div>
                            <div className="form-group">
                                <label className="form-inline" for="reportedCases">Reported Cases</label>
                                <input className="form-control" type="number" id="reportedCases" name="reportedCases" data-reported-cases required onChange={this.handleChange}/>
                                
                            </div>
                            <div className="form-group">
                                <label className="form-inline" for="timeToElapse">Time Period</label>
                                <input className="form-control" type="number" id="timeToElapse" name="timeToElapse" data-time-to-elapse required onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label className="form-inline" for="periodType" id="lab">Period Type</label>
                                <select className="form-control" id="periodType" name="periodType" data-period-type onChange={this.handleChange}>
                                    <option value="days">Days</option>
                                    <option value="weeks">Weeks</option>
                                    <option value="months">Months</option>
                                </select>
                                </div>
                            <div className="form-group">
                                <label className="form-inline" for="totalHospitalBeds">Hospital Beds</label>
                                <input className="form-control" type="number" id="totalHospitalBeds" name="totalHospitalBeds" data-total-hospital-beds required onChange={this.handleChange}/><br></br>
                            </div>
                                <input className="btn btn-primary btn-lg" type="submit" value="Estimate" data-go-estimate/>
                                
                            </form>
                    </div>

                    <div className="container col-sm-4 mt-4">
                        <div className="container bg-warning radius text-light font-weight-bold">NORMAL IMPACT ESTIMATE</div>
                    
                        <div className ="border rounded text-success font-weight-bold text-left font-weight-bold">
                            <p className="ml-3">ACTUAL INFECTIONS: {this.state.impact.currentlyInfected} </p><br/>
                            <p className="ml-3">INFECTIONS AFTER {this.state.timeToElapse} {this.state.periodType} : {this.state.impact.infectionsByRequestedTime} </p><br/>
                            <p className="ml-3">SEVERE CASES: {this.state.impact.severeCasesByRequestedTime} </p><br/>
                            <p className="ml-3">AVAILABLE HOSPITAL BEDS: {this.state.impact.hospitalBedsByRequestedTime} </p><br/>
                            <p className="ml-3">CASES FOR ICU: {this.state.impact.casesForICUByRequestedTime} </p><br/>
                            <p className="ml-3">CASES FOR VENTILATORS: {this.state.impact.casesForVentilatorsByRequestedTime} </p><br/>
                            <p className="ml-3">ECONOMIC IMPACT ($): {this.state.impact.dollarsInFlight} </p><br/>                        
                        </div>
                        
                    </div>

                    <div className="container col-sm-4 mt-4">
                        <div className="container bg-danger radius text-light font-weight-bold">SEVERE IMPACT ESTIMATE</div>
                    
                        <div className ="border rounded text-danger font-weight-bold text-left">
                            <p className="ml-3">ACTUAL INFECTIONS: {this.state.severeImpact.currentlyInfected} </p><br/>
                            <p className="ml-3">INFECTIONS AFTER {this.state.timeToElapse} {this.state.periodType}: {this.state.severeImpact.infectionsByRequestedTime} </p><br/>
                            <p className="ml-3">SEVERE CASES: {this.state.severeImpact.severeCasesByRequestedTime} </p><br/>
                            <p className="ml-3">AVAILABLE HOSPITAL BEDS: {this.state.severeImpact.hospitalBedsByRequestedTime} </p><br/>
                            <p className="ml-3">CASES FOR ICU: {this.state.severeImpact.casesForICUByRequestedTime} </p><br/>
                            <p className="ml-3">CASES FOR VENTILATORS: {this.state.severeImpact.casesForVentilatorsByRequestedTime} </p><br/>
                            <p className="ml-3">ECONOMIC IMPACT ($): {this.state.severeImpact.dollarsInFlight} </p><br/>                        
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Display;