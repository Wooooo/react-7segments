import React        from 'react';
import ReactDOM     from 'react-dom';
import TestUtils    from 'react-addons-test-utils';
import SegDigit     from '../src/components/SegDigit';
import Perf         from 'react-addons-perf';
import PerfAnalysis from 'react/lib/ReactDefaultPerfAnalysis';


require('console.table');

describe.skip('SegGroup Component', function(){
    var TestDir = React.createClass({
        getInitialState: function(){
            return {
                value: 0
            };
        },
        handleChange: function(event){
            this.setState({value: Number(event.target.value)});
        },
        render: function(){
            return (
                <div>
                    <input value={this.state.value} ref="input" type="number" onChange={this.handleChange} />
                    <SegDigit value={this.state.value}/>
                </div>
            );
        }
    });
    
    it('should detect change and re-render when values are not random.', function(){
        var renderer = TestUtils.renderIntoDocument(<TestDir/>);
        
        var node = renderer.refs.input;
        
        var total = 0;
        for(var j = 0 ; j < 10 ; j++) {
            
            Perf.start();
            for(var i = 1 ; i < 256 ; i++) {
                
                node.value = i;
                TestUtils.Simulate.change(node);
                TestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
            }
            Perf.stop();
            
            var result = Perf.getLastMeasurements();
            var time = parseFloat(PerfAnalysis.getTotalTime(result).toFixed(2));
            //Perf.printInclusive(result);
            
            //console.log(`${j}: ${PerfAnalysis.getTotalTime(result).toFixed(2)}`);
            
            total += time;
        }
        
        console.log(total/10);
    });
    
    
    
    it('should detect change and re-render.', function(){
        var renderer = TestUtils.renderIntoDocument(<TestDir/>);
        
        var node = renderer.refs.input;
        
        var total = 0;
        for(var j = 0 ; j < 10 ; j++) {
            var values = [], i;
            
            for(i = 0 ; i < 256 ; i++) {
                values.push(Math.floor(Math.random()*256));
            }
            
            Perf.start();
            for(i = 1 ; i < 256 ; i++) {
                
                node.value = values[i];
                TestUtils.Simulate.change(node);
                TestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
            }
            Perf.stop();
            
            var result = Perf.getLastMeasurements();
            var time = parseFloat(PerfAnalysis.getTotalTime(result).toFixed(2));
            //Perf.printInclusive(result);
            
            //console.log(`${j}: ${PerfAnalysis.getTotalTime(result).toFixed(2)}`);
            
            total += time;
        }
        
        console.log(total/10);
    });
    
});