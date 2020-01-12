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

    const {label, items, error, height, width, inputAttributes} = props;

    const labelStyle = {color: error && 'red', fontWeight: error && 'bold', marginBottom:'0'};
    const selectStyle={height:height, width: width}
    // function handleMultipleSelect(e) {
    //     //debugger
    //     const result = getSelectValues(multipleSelect.current);
    //     changeHandler(name, result)
    //
    // }
    return (
        <div className="form-group">
            <label style={labelStyle}>{label}</label>
            <select className={`user-form-control`} style={selectStyle} {...inputAttributes}>
                {
                    items.map((item) => {
                        return <option key={item.id} value={item.id}>{item.name}</option>
                    })
                }

            </select>
        </div>
    );
};