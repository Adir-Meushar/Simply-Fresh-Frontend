import { useContext, useState } from 'react';
import Joi from 'joi';
import './contact-styles/contact.css';
import './contact-styles/contact-responsive.css';
import { GeneralContext } from '../../../App';
import { FaWhatsapp } from 'react-icons/fa';
import { RiCustomerServiceLine } from 'react-icons/ri';
import { GrMailOption } from 'react-icons/gr';
import { contactSchema } from './contactValidation';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const navigate=useNavigate();

    const { isDarkMode,snackbar } = useContext(GeneralContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        const fieldSchema = Joi.object({
            [name]: contactSchema.extract(name)
        });
        const { error } = fieldSchema.validate({ [name]: value });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error ? error.details[0].message : value.trim() === '' ? 'This field is required' : ''
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidForm = validateForm(); 
        const isNotEmpty = Object.values(formData).every(value => value.trim() !== ''); 
        if (isValidForm && isNotEmpty) {
            snackbar('Form submitted successfully!');
            navigate('/');
        } else {
            snackbar('Please fill in all required fields!');
        }
    };

    const validateForm = () => {
        let isValid = true; 
        const formDataKeys = Object.keys(formData);
        formDataKeys.forEach((key) => {
            validateField(key, formData[key]);
            if (errors[key]) {
                isValid = false; 
            }
        });
        return isValid; 
    };

    return (
        <div className={`contact-box ${isDarkMode ? 'dark' : ''}`}>
            <img className='contact-main-img' src='https://noyhasade.co.il/_nuxt/img/pic.d8f45c2.png' alt='' />
            <div className='contact-form-box'>
                <h1>Get in Touch: We'd Love to Hear from You!</h1>
                <p>
                    Our customer service is available and attentive to you, Sunday through Thursday, from 7:00 to
                    23:00, and on Fridays until 14:00, in order to provide you with quick responses and excellent
                    service
                </p>
                <div className='form-icons-box'>
                    <div className='form-icon-box'>
                        054-3143870 <FaWhatsapp className='form-icon' />{' '}
                    </div>
                    <div className='form-icon-box'>
                        09-9589323 <RiCustomerServiceLine className='form-icon' />
                    </div>
                    <div className='form-icon-box'>
                        simplyFresh@gmail.com <GrMailOption className='form-icon' />
                    </div>
                </div>
                <form className='contact-form' onSubmit={handleSubmit}>
                    <label>
                        <input
                            autoComplete="off"
                            placeholder='First-Name'
                            type='text'
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <div className='error-message'>{errors.firstName}</div>}
                    </label>
                    <label>
                        <input
                            autoComplete="off"
                            placeholder='Last-Name'
                            type='text'
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <div className='error-message'>{errors.lastName}</div>}
                    </label>
                    <label>
                        <input
                            autoComplete="off"
                            placeholder='Phone'
                            type='phone'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <div className='error-message'>{errors.phone}</div>}
                    </label>
                    <label>
                        <input
                            autoComplete="off"
                            placeholder='Email'
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className='error-message'>{errors.email}</div>}
                    </label>
                    <textarea
                        placeholder='Your Message...'
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        cols='30'
                        rows='10'></textarea>
                    {errors.message && <div className='error-message'>{errors.message}</div>}
                    <button className='slide'>Submit</button>
                </form>
            </div>
            <img className='berris' src='https://noyhasade.co.il/_nuxt/img/berris.1e7f40a.png' alt='' />
        </div>
    );
};

export default Contact;
