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


export const ListBoxGrapes = (props) => {
    const {label, items, error, height, inputAttributes} = props;
    const labelStyle = {color: error && 'red', fontWeight: error && 'bold'};
    const heightStyle={height:height};

    // function handleMultipleSelect(e) {
    //     //debugger
    //     const result = getSelectValues(multipleSelect.current);
    //     changeHandler(name, result)
    //
    // }
    return (
        <div className="form-group text-center">
            <label style={labelStyle}>{label}</label>
            <select className={`user-form-control`} style={heightStyle} {...inputAttributes}>
                {
                    items.map((item) => {
                        return <option key={item.id} value={item.name}>{item.name}</option>
                    })
                }

            </select>
        </div>
    );
};

// `user-form-control height${height}`