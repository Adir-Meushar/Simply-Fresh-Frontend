import { useContext, useEffect, useState } from "react";
import '../../modal-styles/modal.css'
import { editProductValidationSchema } from "../prodcut-validation";
import { GeneralContext } from "../../../App";

function EditProduct({ modal, setModal, currentProduct, setProducts, products }) {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({});
    const [isFormValid, setIsFormValid] = useState(true);
    const { snackbar, setLoader, isDarkMode } = useContext(GeneralContext);

    useEffect(() => {
        if (Object.keys(currentProduct).length) {
            setFormData(currentProduct)
        } else {
            setFormData({})
        }

    }, [currentProduct])

    const nutritionalValue = {
        calories: '',
        carbohydrates: '',
        protein: '',
        fat: '',
    }
    const resetForm = () => {
        setFormData(currentProduct);
        setErrors([]);
    };

    const renderError = (name) => {
        return errors[name] && (
            <div className="error-message">
                {errors[name]}
            </div>
        );
    };

    const handleValid = (ev, item) => {
        const { name, value, type, checked } = ev.target;
        const newValue = type === 'checkbox' ? checked : value; // Use checked for checkbox type
        const obj = name === 'nutritionalValue'
            ? { ...formData, [name]: { ...formData.nutritionalValue, [item]: +newValue } }
            : name === 'img' ? { ...formData, [name]: { ...formData.img, [item]: newValue } } : { ...formData, [name]: newValue }
        setFormData(obj)
        const validate = editProductValidationSchema.validate(obj, { abortEarly: false })
        const tempErrors = { ...errors }
        delete tempErrors[name];
        if (validate.error) {
            validate.error.details.forEach((error) => {
                if (error.path[0] === 'img' && (error.path[1] === 'url' || error.path[1] === 'alt')) {
                    tempErrors[`img.${error.path[1]}`] = error.message;
                } else if (error.path[0] === 'nutritionalValue' && ['calories', 'carbohydrates', 'protein', 'fat'].includes(error.path[1])) {
                    tempErrors[`nutritionalValue.${error.path[1]}`] = error.message;
                } else {
                    const errorKey = error.context.key || name;
                    tempErrors[errorKey] = error.message;
                }
            });
        } else {
            delete tempErrors['img.url'];
            delete tempErrors['img.alt'];
            delete tempErrors['nutritionalValue.calories'];
            delete tempErrors['nutritionalValue.carbs'];
            delete tempErrors['nutritionalValue.protein'];
            delete tempErrors['nutritionalValue.fat'];
        }
        setIsFormValid(!validate.error)
        setErrors(tempErrors)
    }

    const editProduct = async (ev, productId) => {
        ev.preventDefault();
        try {
            setLoader(true)
            const response = await fetch(`http://localhost:4000/products/${productId}`, {
                credentials: "include",
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.token,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.error) {
                setErrors(data.error);
                snackbar(`${data.error.details}`)
            } else {
                const updatedProducts = products.map(product => {
                    if (product._id === productId) {
                        return data;
                    }
                    return product;
                });
                setProducts(updatedProducts);
                setModal(false);
                resetForm(currentProduct);
                snackbar(`${data?.title} Was updated Successfully!`)
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
        setTimeout(() => {
            setLoader(false)
        }, 1000)
    }

    return (
        <>
            {modal && Object.keys(formData).length && (
                <div className="modal-frame">
                    <div className={`product-modal ${isDarkMode ? 'dark' : ''}`}>
                        <header>
                            <button className="close-btn" onClick={() => { setModal(false); resetForm(); }}>X</button>
                            <h2>Edit Product</h2>
                        </header>
                        <form onSubmit={(ev) => editProduct(ev, formData._id)} >
                            <div className="form-product-header">
                                <label className="input-box">
                                    Category:
                                    <select name="category" onChange={handleValid} value={formData.category}>
                                        <option value="Vegetables">Vegetables</option>
                                        <option value="Fruits">Fruits</option>
                                        <option value="Eggs&Dairy">Eggs&Dairy</option>
                                        <option value="Bakery">Bakery</option>
                                    </select>
                                </label>
                                <label className="input-box">
                                    Title:
                                    <input type="text" autoComplete="off" onChange={handleValid} value={formData.title} name="title" />
                                    {renderError("title")}
                                </label>
                            </div>
                            <h3>Nutritional Values (100g)</h3>
                            <div className="nutrition-value">
                                {Object.keys(nutritionalValue)?.map((item, index) => (
                                    <label key={index} className="input-box">
                                        {item}
                                        <input name='nutritionalValue' type="number" autoComplete="off"
                                            onChange={(ev) => handleValid(ev, item)}
                                            value={formData.nutritionalValue[item]}
                                            className="input-number" />
                                        {renderError(`nutritionalValue.${item}`)}
                                    </label>
                                ))}
                            </div>
                            <div className="pricing">
                                <label>Price
                                    <input type="number" autoComplete="off" onChange={handleValid} value={formData.sale ? formData.finalPrice : formData.price} name="price" className="input-number" />
                                    {renderError("price")}
                                </label>
                                <label>Sale
                                    <input type="checkbox" onChange={handleValid} value={formData.sale} checked={formData.sale} name="sale" />
                                </label>
                            </div>
                            <div className="unit-type">
                                Unit:
                                <label>
                                    <input name="unit" type="radio" value="kg"
                                        checked={formData.unit === 'kg'} onChange={handleValid} />
                                    KG
                                </label>
                                <label>
                                    <input name="unit" type="radio" value="package"
                                        checked={formData.unit === 'package'} onChange={handleValid} />
                                    Package
                                </label>
                                <label>
                                    <input name="unit" type="radio" value="unit"
                                        checked={formData.unit === 'unit'} onChange={handleValid} />
                                    Unit
                                </label>
                            </div>
                            <div className="img-details">
                                <label>Image URL:
                                    <input type="text" autoComplete="off" name="img"
                                        onChange={(ev) => handleValid(ev, 'url')} value={formData.img.url} />
                                    {renderError("img.url")}
                                </label>
                                <label> Image Alt:
                                    <input type="text" autoComplete="off" name="img"
                                        onChange={(ev) => handleValid(ev, 'alt')} value={formData.img.alt} />
                                    {renderError("img.alt")}
                                </label>
                            </div>
                            <label style={{ textAlign: 'left' }}>
                                Description
                                <textarea className="description" name="description" onChange={handleValid} value={formData.description} />
                                {renderError("description")}
                            </label>
                            <button className="btnAdd" disabled={!isFormValid} >Update</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditProduct;
