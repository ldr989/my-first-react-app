import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: "John S.",
                    salary: 800,
                    increase: false,
                    rise: true,
                    id: 1,
                },
                {
                    name: "Alex M.",
                    salary: 3000,
                    increase: true,
                    rise: false,
                    id: 2,
                },
                {
                    name: "Carl W.",
                    salary: 5000,
                    increase: false,
                    rise: false,
                    id: 3,
                },
            ],
            term: "",
            filter: "all",
        };
        this.maxId = 4;
    }

    addItem = (name, salary) => {
        if (this.state.data.length === 0) {
            this.maxId = 0;
        }
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++,
        };
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr,
            };
        });
        // if (
        //     name !== "" &&
        //     salary !== "" &&
        //     name.length > 3 &&
        //     salary >= 0 &&
        //     !/\d/.test(name)
        // ) {
        //     const newItem = {
        //         name,
        //         salary,
        //         increase: false,
        //         rise: false,
        //         id: this.maxId++,
        //     };
        //     this.setState(({ data }) => {
        //         const newArr = [...data, newItem];
        //         return {
        //             data: newArr,
        //         };
        //     });
        // }
    };

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter((item) => item.id !== id),
            };
        });
    };

    onToggleProp = (id, prop) => {
        // 1 способ:
        // this.setState(({ data }) => {
        //     const index = data.findIndex((elem) => elem.id === id);

        //     const old = data[index];
        //     const newItem = { ...old, increase: !old.increase };
        //     const newArr = [
        //         ...data.slice(0, index),
        //         newItem,
        //         ...data.slice(index + 1),
        //     ];

        //     return {
        //         data: newArr,
        //     };
        // });
        // второй способ:
        this.setState(({ data }) => ({
            data: data.map((item) => {
                // перебираем каждый элемент внутри data, ищем совпадения в элементе на id, если такой есть заменяем значение и возвращаем этот измененный элемент, если совпадения нет то просто возвращаем так как есть. В конце map() возвращает новый массив с объектами и он записывается в this.state.data
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] };
                }
                return item;
            }),
        }));
    };

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.name.indexOf(term) > -1; // indexOf ищет сабстроку(term) в строке item.name если находит то выдает позицию, но нам нужно только булиновое значение, поэтому тут стоит оператор >. Если term найдется в строке то вернется его позиция а значит оно будет больше чем -1 и вернется true - выполнится условие фильтера и он вернет новый массив (terms) с найденным элементов внутри(item). Если term не найдется в строке то вернется -1 а значит false, фильтр перейдет к другому item
        });
    };

    onUpdateSearch = (term) => {
        this.setState({ term });
    };

    filterPost = (items, filter) => {
        switch (filter) {
            case "rise":
                return items.filter((item) => item.rise); // тут внутри скобок сокращенная запись которая заменяет конструкцию if else. если значение item.rise === true то возвращается этот item
            case "moreThan1000":
                return items.filter((item) => item.salary > 1000);
            default:
                return items;
        }
    };

    onFilterSelect = (filter) => {
        this.setState({ filter });
    };

    render() {
        const { data, term, filter } = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(
            (item) => item.increase
        ).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;
