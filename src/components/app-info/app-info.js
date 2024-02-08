import "./app-info.css";

// {
//     numberOfEmployees: this.state.data.length,
//     onIncrease: increaseCounter,
//     onRise: riseCounter,
// };
const AppInfo = ({ employees, increased }) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании X: </h1>
            <h2>Общее число сотрудников: {employees}</h2>
            <h2>Премию получат: {increased}</h2>
        </div>
    );
};

export default AppInfo;
