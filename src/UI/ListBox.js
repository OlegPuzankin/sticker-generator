import React from 'react';


function getSelectValues(select) {
    let result = [];
    let options = select && select.options;
    debugger
    for (let opt of options) {
        if (opt.selected) {
            result.push(opt.value || opt.text)
        }
    }
    return result;
}



export const ListBox = (props) => {
    const multipleSelect = React.useRef(null);

    const {name, changeHandler, label} = props;

    function handleMultipleSelect(e) {
        //debugger
        const result = getSelectValues(multipleSelect.current);
        changeHandler(name, result)

    }
    return (
        <div className="form-group ">
            <label>{label}</label>
            <select multiple
                    ref={multipleSelect}
                    onChange={handleMultipleSelect}
                    className="user-form-control height300">
                <option>Shiraz</option>
                <option>Merlo</option>
                <option>Caberne</option>
                <option>Zinfandel</option>
                <option>Shiraz</option>
                <option>Merlo</option>
                <option>Caberne</option>
                <option>Zinfandel</option>
                <option>Shiraz</option>
                <option>Merlo</option>
                <option>Caberne</option>
                <option>Zinfandel</option>
            </select>
        </div>
    );
};