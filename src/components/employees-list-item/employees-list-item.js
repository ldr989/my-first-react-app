import { Component } from "react";

import "./employees-list-item.css";

class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            increase: false,
            rise: false,
        };
    }

    onRise = () => {
        this.setState(({ rise }) => ({
            rise: !rise,
        }));
    };

    onIncrease = () => {
        this.setState(({ increase }) => ({
            // Конструкция калбек. Калбек в себя принимает 1 аргумент это деструктуризирванное свойство обьекта state далее после стрелки открываются круглые скобки чтобы не прописывать return а сразу вернуть изменненный объект. Тут !increase означает противоположное значение
            increase: !increase,
        }));
    };

    render() {
        const { name, salary, onDelete } = this.props;
        const { increase, rise } = this.state;

        let classNames = "list-group-item d-flex justify-content-between";
        if (increase) {
            classNames += " increase";
        }
        if (rise) {
            classNames += " like";
        }

        return (
            <li className={classNames}>
                <span className="list-group-item-label" onClick={this.onRise}>
                    {name}
                </span>
                <input
                    type="text"
                    className="list-group-item-input"
                    defaultValue={salary + "$"}
                />
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        type="button"
                        className="btn-cookie btn-sm "
                        onClick={this.onIncrease}
                    >
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button
                        type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        );
    }
}

export default EmployeesListItem;
