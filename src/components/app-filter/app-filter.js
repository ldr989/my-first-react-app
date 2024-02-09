import { Component } from "react";
import "./app-filter.css";

class AppFilter extends Component {
    toggleClass = (name) => {
        const { data } = this.props;
        let selected = "";

        data.forEach((item) => {
            if (item.name === name) {
                selected = item.selected;
            }
        });

        if (selected) {
            return "btn btn-light";
        } else {
            return "btn btn-outline-light";
        }
    };
    render() {
        const { onFiltered } = this.props;
        return (
            <div className="btn-group">
                <button
                    className={this.toggleClass("employees")}
                    data-toggle="employees"
                    type="button"
                    onClick={(e) => onFiltered(e)}
                >
                    Все сотрудники
                </button>
                <button
                    className={this.toggleClass("rised")}
                    data-toggle="rised"
                    type="button"
                    onClick={(e) => onFiltered(e)}
                >
                    На повышение
                </button>
                <button
                    className={this.toggleClass("moreThan")}
                    data-toggle="moreThan"
                    type="button"
                    onClick={(e) => onFiltered(e)}
                >
                    З/П больше 1000$
                </button>
            </div>
        );
    }
}

export default AppFilter;
