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

    const {name, changeHandler, label, items} = props;

    // function handleMultipleSelect(e) {
    //     //debugger
    //     const result = getSelectValues(multipleSelect.current);
    //     changeHandler(name, result)
    //
    // }
    return (
        <div className="form-group text-center">
            <label>{label}</label>
            <select multiple
                    name={name}
                    ref={multipleSelect}
                    onChange={changeHandler}
                    className="user-form-control height300">
                {
                    items.map((item, index)=>{
                        return <option key={`${item} - ${index}`} value={item}>{item}</option>
                    })
                }

            </select>
        </div>
    );
};