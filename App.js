import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Button from './Button';
import Result from './Result';
import SplashScreen from 'react-native-splash-screen';

var mexp = require('math-expression-evaluator');

export default class App extends React.Component {
    componentDidMount() {
        SplashScreen.hide();
    }

    constructor() {
        super();

        const isPortrait = () => {
            const dim = Dimensions.get('window');
            return dim.height > dim.width;
        };

        this.state = {
            topResultText: '',
            bottomResultText: '0',
            orientation: isPortrait() ? 'PORTRAIT' : 'LANDSCAPE',
            operation: '',
            isDot: false,
        };

        this.portraitButtons = [
            {title: 'AC', color: '#ff8d00'},
            {title: '<-', color: '#ff8d00'},
            {title: '+/-', color: '#ff8d00'},
            {title: '/', color: '#ff8d00'},
            {title: '7', color: '#757575'},
            {title: '8', color: '#757575'},
            {title: '9', color: '#757575'},
            {title: 'x', color: '#ff8d00'},
            {title: '4', color: '#757575'},
            {title: '6', color: '#757575'},
            {title: '5', color: '#757575'},
            {title: '-', color: '#ff8d00'},
            {title: '1', color: '#757575'},
            {title: '2', color: '#757575'},
            {title: '3', color: '#757575'},
            {title: '+', color: '#ff8d00'},
            {title: ' ', color: '#757575'},
            {title: '0', color: '#757575'},
            {title: '.', color: '#757575'},
            {title: '=', color: '#ff8d00'},
        ];

        this.landscapeButtons = [
            {title: '√x', color: '#ff8d00'},
            {title: 'log10', color: '#ff8d00'},
            {title: 'AC', color: '#ff8d00'},
            {title: '<-', color: '#ff8d00'},
            {title: '+/-', color: '#ff8d00'},
            {title: '/', color: '#ff8d00'},
            {title: 'e^x', color: '#ff8d00'},
            {title: '10^x', color: '#ff8d00'},
            {title: '7', color: '#757575'},
            {title: '8', color: '#757575'},
            {title: '9', color: '#757575'},
            {title: 'x', color: '#ff8d00'},
            {title: 'ln(x)', color: '#ff8d00'},
            {title: 'x!', color: '#ff8d00'},
            {title: '4', color: '#757575'},
            {title: '5', color: '#757575'},
            {title: '6', color: '#757575'},
            {title: '-', color: '#ff8d00'},
            {title: 'e', color: '#ff8d00'},
            {title: 'x^2', color: '#ff8d00'},
            {title: '1', color: '#757575'},
            {title: '2', color: '#757575'},
            {title: '3', color: '#757575'},
            {title: '+', color: '#ff8d00'},
            {title: 'pi', color: '#ff8d00'},
            {title: 'x^3', color: '#ff8d00'},
            {title: '', color: '#757575'},
            {title: '0', color: '#757575'},
            {title: '.', color: '#757575'},
            {title: '=', color: '#ff8d00'},
        ];

        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'PORTRAIT' : 'LANDSCAPE',
            });
        });
    }

    renderPortraitButtons() {
        return (
            <View style={styles.calculatorStyle}>
                {this.portraitButtons.map((element) => {
                    return (
                        <Button
                            title={element.title}
                            key={element.key}
                            color={element.color}
                            size={'25%'}
                            handleOnPress={this.whichButtonPressed.bind(this, element.title)}
                        />
                    );
                })}
            </View>
        );
    }

    renderLandscapeButtons() {
        return (
            <View style={styles.calculatorStyle}>
                {this.landscapeButtons.map((element) => {
                    return (
                        <Button
                            title={element.title}
                            key={element.key}
                            color={element.color}
                            size={'16.66%'}
                            handleOnPress={this.whichButtonPressed.bind(this, element.title)}
                        />
                    );
                })}
            </View>
        );
    }

    whichButtonPressed = (input) => {
        const {bottomResultText, topResultText, operation, isDot} = this.state;
        switch (input) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.setState({
                    bottomResultText:
                        bottomResultText === '0' ? input : bottomResultText + input,
                });
                break;

            case '.':
                if (bottomResultText != "" && isDot == false) {
                    for (let i = 0; i < bottomResultText.length; i++) {
                        if (bottomResultText.charAt(i) == ".") {
                            isDot:true;
                        } else {
                            this.setState({
                                bottomResultText: bottomResultText + input,
                                isDot: true,
                            });
                        }
                    }
                }
                break;

            case 'AC':
                this.setState({
                    bottomResultText: '0',
                    topResultText: ' ',
                    isDot: false,
                });
                break;

            case '<-':
                var delTemp = bottomResultText.toString();
                if (delTemp.toString().length > 0) {
                    delTemp = delTemp.substr(0, delTemp.length - 1);
                    console.log(delTemp);
                    this.setState({
                        bottomResultText: delTemp,
                    })
                }
                break;

            case '+/-':
                var resultTemp = bottomResultText.toString();
                if (resultTemp.charAt(0) != '-') {
                    this.setState({
                        bottomResultText: "-" + bottomResultText,
                    });
                } else {
                    this.setState({
                        bottomResultText: bottomResultText.substr(1, bottomResultText.length - 1),
                    });
                }
                break;

            case '+':
            case '-':
            case 'x':
            case '/':
                if (bottomResultText != "") {
                    this.setState({
                        topResultText: topResultText + bottomResultText + input,
                        operation: input,
                        bottomResultText: "",
                        isDot: false,
                    });
                }
                break;

            case 'x!':
            case 'x^2':
            case 'x^3':
            case '10^x':
            case '√x':
            case 'pi':
            case 'e':
            case 'ln(x)':
            case 'e^x':
            case 'log10':
                this.horizontalOperation(input);
                break;

            case '=':
                var result = 0;
                var equation = 0;


                setTimeout(() => {
                    this.setState(
                        {
                            topResultText: topResultText + bottomResultText,
                        },
                        function () {
                            if (this.state.topResultText.toString().charAt(this.state.topResultText.toString().length - 1) != '+' &&
                                this.state.topResultText.toString().charAt(this.state.topResultText.toString().length - 1) != '-' &&
                                this.state.topResultText.toString().charAt(this.state.topResultText.toString().length - 1) != 'x' &&
                                this.state.topResultText.toString().charAt(this.state.topResultText.toString().length - 1) != '/') {
                                equation = this.state.topResultText;
                                var eq = equation.replaceAll("x", "*");
                                result = mexp.eval(eq);
                            }
                        });
                }, 1)

                setTimeout(() => {

                    this.setState(
                        {
                            bottomResultText: result,
                            topResultText: '',
                        },
                    );
                }, 1)

                break;
        }
        ;

        String.prototype.replaceAll = function (str1, str2, ignore) {
            return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
        }
    }

    horizontalOperation = (operationToPerform) => {
        const {bottomResultText, topResultText, operation} = this.state;
        let result = 0;
        switch (operationToPerform) {


            case 'x^2':
                result = Math.pow(bottomResultText, 2);
                this.setState({
                    bottomResultText: result,
                    //  topResultText: bottomResultText+ "^2",
                });
                break;

            case 'x^3':
                result = Math.pow(bottomResultText, 3);
                this.setState({
                    bottomResultText: result,
                    //  topResultText: bottomResultText+ "^3",
                });
                break;

            case '√x':
                result = Math.sqrt(bottomResultText);
                this.setState({
                    bottomResultText: result,
                    //topResultText: "√("+bottomResultText+ ")",
                });
                break;

            case 'ln(x)':
                result = Math.log(bottomResultText);
                this.setState({
                    bottomResultText: result,
                    //  topResultText: "ln("+bottomResultText+ ")",
                });
                break;

            case '10^x':
                result = Math.pow(10, bottomResultText);
                this.setState({
                    bottomResultText: result,
                    //  topResultText: "10^"+bottomResultText,
                });
                break;

            case 'e^x':
                result = Math.pow(Math.E, bottomResultText);
                this.setState({
                    bottomResultText: result,
                    //  topResultText: "e^"+bottomResultText,
                });
                break;

            case 'log10':
                result = Math.log10(bottomResultText);
                this.setState({
                    bottomResultText: result,
                    //  topResultText: "log10("+bottomResultText+")",
                });
                break;

            case 'pi':
                result = Math.PI.toFixed(5);
                this.setState({
                    bottomResultText: result,
                });
                break;

            case 'e':
                result = Math.E.toFixed(5);
                this.setState({
                    bottomResultText: result,
                });
                break;

            case 'x!':
                result = 0;
                var equation = 0;
                if (this.state.bottomResultText < 100 && this.state.bottomResultText >= 0) {
                    equation = this.state.bottomResultText + "!";
                    result = mexp.eval(equation);
                    console.log(result);
                    this.setState({
                        //  topResultText: bottomResultText+ "!",
                        bottomResultText: result,
                    });
                }
                break;
        }
    };

    render() {
        let view =
            this.state.orientation === 'PORTRAIT'
                ? this.renderPortraitButtons()
                : this.renderLandscapeButtons();

        return (
            <View style={styles.container}>
                <Result title={this.state.topResultText} color={'#BDBDBD'}>
                </Result>
                <Result title={this.state.bottomResultText} color={'white'}>
                </Result>
                {view}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    calculatorStyle: {
        flex: 8,
        alignContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
});
