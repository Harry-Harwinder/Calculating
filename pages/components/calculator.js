import React, { useState } from "react";
import styles from '../../styles/Home.module.css'
import * as math from "mathjs";
function Calculator() {


    const [expression, setExpression] = useState("");
    const [screenVal, setScreenVal] = useState("");
    const [customVariables, setCustomVariables] = useState({});
    const [mode, setMode] = useState("rad");

    function handleChange(e) {
        setExpression(e.target.value);
    }

    function handleClick(input) {
        setExpression((prevExpression) => prevExpression + input);
        switch (input) {
            case "AC":
                clearScreen();
                break;
            case "=":
                calculate();
                break;
            case "sin":
                calculate();
                break;
            case "cos":
                calculate();
                break;
            case "tan":
                calculate();
                break;
            case "sinh":
                calculate();
                break;
            case "cosh":
                calculate();
                break;
            case "tanh":
                calculate();
                break;
            case "DEL":
                backspace();
                break;
            default:
                break;
        }

    }

    function calculate() {
        try {
            const allVariables = {
                ...customVariables,
                pi: Math.PI,
                e: Math.E,
                sin: mode === "rad" ? Math.sin : math.sin,
                cos: mode === "rad" ? Math.cos : math.cos,
                tan: mode === "rad" ? Math.tan : math.tan,
                sinh: mode === "rad" ? Math.sinh : math.sinh,
                cosh: mode === "rad" ? Math.cosh : math.cosh,
                tanh: mode === "rad" ? Math.tanh : math.tanh,
                
            };

            const result = math.evaluate(expression, allVariables);
            if (typeof result === "number" && !isNaN(result)) {
                setScreenVal(Number(result).toFixed(4));
            } else {
                setScreenVal("Error: Invalid expression");
            }
        } catch (error) {
            setScreenVal("Error: Invalid expression");
        }
    }

    function clearScreen() {
        setExpression("");
        setScreenVal("");
    }

    function backspace() {
        const newExpression = expression.slice(0, -1);
        setExpression(newExpression);
    }

    function toggleMode() {
        setMode(mode === "rad" ? "deg" : "rad");
    }

    return (
        <><div className={styles.App}>
            <div className={styles.calcbody}>
                <div className={styles.inputsection}>
                    <input
                        className={styles.screen}
                        type="text"
                        value={expression}
                        onChange={handleChange} />
                    <div className={styles.output}>Output: {screenVal}</div>
                </div>
                <div className={styles.buttonsection}>

                    <div className={styles.operators}>
                        {[
                            "(",
                            ")",
                            "mc",
                            "m+",
                            "m-",
                            "mr",
                            "AC",
                            "+/-",
                            "%",
                            "÷",
                            "2nd",
                            "x²",
                            "x³",
                            "xy",
                            "ex",
                            "10x",
                            "7",
                            "8",
                            "9",
                            "x",
                            "1/x",
                            "2rtx",
                            "3rtx",
                            "yrtx",
                            "ln",
                            "log10",
                            "4",
                            "5",
                            "6",
                            "-",
                            "x!",
                            "sin",
                            "cos",
                            "tan",
                            "e",
                            "EE",
                            "1",
                            "2",
                            "3",
                            "+",
                            "Rad",
                            "sinh",
                            "cosh",
                            "tanh",
                            "Rand",
                            "0",
                            ".",
                            "=",
                            "DEL"

                        ].map((input) => (
                            <button
                                className={`${styles.buttontext} ${['+', '-', 'x', '/', '^'].includes(input) ? styles.specialButton : ''}
                            ${['AC', '+/-', '%', '/', 'DEL'].includes(input) ? styles.specialButtonAC : ''}`}
                                key={input}
                                onClick={() => handleClick(input)}
                            >
                                {input}
                            </button>
                        ))}



                        <button className={styles.buttontext} onClick={() => handleClick("pi")}>Pi</button>

                    </div>



                </div>
            </div>
            <div className={styles.variables}></div>
        </div></>
    );
}

export default Calculator;
