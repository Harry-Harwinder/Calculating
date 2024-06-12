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
        switch (input) {
            case "AC":
                clearScreen();
                break;
            case "=":
                calculate();
                break;
            case "DEL":
                backspace();
                break;
            case "Rad":
                toggleMode();
                break;
            case "pi":
                setExpression((prevExpression) => prevExpression + "pi");
                break;
            case "x²":
                setExpression((prevExpression) => prevExpression + "^2");
                break;
            case "x³":
                setExpression((prevExpression) => prevExpression + "^3");
                break;
            case "xy":
                setExpression((prevExpression) => prevExpression + "^");
                break;
            case "ex":
                setExpression((prevExpression) => prevExpression + "e^");
                break;
            case "10x":
                setExpression((prevExpression) => prevExpression + "10^");
                break;
            case "sin":
            case "cos":
            case "tan":
            case "sinh":
            case "cosh":
            case "tanh":
                setExpression((prevExpression) => prevExpression + `${input}(`);
                break;
            case "2rtx":
                setExpression((prevExpression) => prevExpression + "2rtx(");
                break;
            case "3rtx":
                setExpression((prevExpression) => prevExpression + "3rtx(");
                break;
            case "yrtx":
                setExpression((prevExpression) => prevExpression + "yrtx(");
                break;
            case "÷":
                setExpression((prevExpression) => prevExpression + "/");
                break;
            case "x":
                setExpression((prevExpression) => prevExpression + "*");
                break;
            default:
                setExpression((prevExpression) => prevExpression + input);
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
                rt2: (x) => Math.pow(x, 1/2),
                rt3: (x) => Math.pow(x, 1/3),
                rtY: (y, x) => Math.pow(x, 1/y)
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
        <div className={styles.App}>
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
                            "pi",
                            "Rand",
                            "0",
                            ".",
                            "=",
                            "DEL"
                        ].map((input) => (
                            <button
                                className={`${styles.buttontext} ${['+', '-', 'x', '/', '^'].includes(input) ? styles.specialButton : ''}
                            ${['AC', '+/-', '%', '/', 'DEL', '='].includes(input) ? styles.specialButtonAC : ''}`}
                                key={input}
                                onClick={() => handleClick(input)}
                            >
                                {input}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.variables}></div>
        </div>
    );
}

export default Calculator
