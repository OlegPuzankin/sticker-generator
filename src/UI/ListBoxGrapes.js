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
    const multipleSelect = React.useRef(null);

    const {name, changeHandler, label, items, error, handleBlur, height} = props;

    const style = {color: error&&'red', fontWeight: error&& 'bold'};


    // function handleMultipleSelect(e) {
    //     //debugger
    //     const result = getSelectValues(multipleSelect.current);
    //     changeHandler(name, result)
    //
    // }
    return (
        <div className="form-group text-center">
            <label style={style}>{label}</label>
            <select multiple
                    name={name}
                    ref={multipleSelect}
                    
                    onBlur={handleBlur}
                    onChange={changeHandler}
                    className={`user-form-control height${height}`}>
                {
                    items.map((item, index)=>{
                        return <option key={item.id} value={item.name}>{item.name}</option>
                    })
                }

            </select>
        </div>
    );
};