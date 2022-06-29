import React, { useEffect, useState } from 'react';
import {  useDispatch } from 'react-redux';

import { addBook, setBooks } from '../store/bookSlice';

export default function NewBook(props) {

    const dispatch = useDispatch();
    const [bookTitle, setBookTitle] = useState('');
    const [bookDesc, setBookDesc] = useState('');
    const [bookPrice, setBookPrice] = useState('');
    const [bookImage, setBookImage] = useState('');
    const [bookCategory, setBookCategory] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const [showTitleReq, setShowTitleReq] = useState(false)
    const [showDescriptionReq, setShowDescriptionReq] = useState(false)
    const [showCategoryReq, setShowCategoryReq] = useState(false)
    const [showPriceReq, setShowPriceReq] = useState(false)
    const [showImageReq, setShowImageReq] = useState(false)



    const categoryList = [
        'Fiction',
        'Non-Fiction',
        'Romance',
        'Cookbook',
        'Self-Help & Wellness',
        'Teen & Young Adult',
        'Thriller',
        'Manga',
        'Biography',
        'Historical Fiction'
    ]

    const onImageChange = (e) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setBookImage(reader.result);
            };
        }
        else {
            setBookImage('')
        }
    };


    useEffect(() => {
        let selected = props.selectedBook;
        if (selected !== '') {
            setBookTitle(selected.title);
            setBookPrice((selected.price));
            setBookCategory(selected.category)
            setBookDesc(selected.description)
            setBookImage(selected.image)
        }
    }, [props.selectedBook])


    const reset = () => {
        props.showModal(false);
        setBookTitle("");
        setBookDesc("")
        setBookImage("")
        setBookPrice("")
        setBookCategory('')
        setShowTitleReq(false)
        setShowDescriptionReq(false);
        setShowCategoryReq(false);
        setShowPriceReq(false);
        setShowImageReq(false);
    }


    const addBookToShelf = () => {
        let descReq = false;
        let titleReq = false;
        let catReq = false;
        let priceReq = false;
        let imgReq = false;

        if (bookTitle === '') {
            titleReq = true;
        }
        else {
            titleReq = false;
        }
        if (bookDesc === '') {
            descReq = true;
        }
        else {
            descReq = false;
        }

        if (bookCategory === '') {
            catReq = true;
        }
        else {
            catReq = false
        }
        if (bookPrice === '') {
            priceReq = true
        }
        else {
            priceReq = false
        }
        if (bookImage === '') {
            imgReq = true
        }
        else {
            imgReq = false
        }

        if (!descReq && !titleReq && !catReq && !priceReq && !imgReq) {
            setShowTitleReq(titleReq)
            setShowDescriptionReq(descReq)
            setShowCategoryReq(catReq)
            setShowPriceReq(priceReq)
            setShowImageReq(imgReq)
            let temp = {
                title: bookTitle,
                price: bookPrice,
                category: bookCategory,
                description: bookDesc,
                image: bookImage
            }
            if (props.selectedBook !== '') {
                let newArr = [...props.books];
                newArr[props.selectedIndex] = temp;
                dispatch(setBooks(newArr))
            }
            else {
                dispatch(addBook(temp))

            }
            reset();
        }
        else {
            setShowTitleReq(titleReq)
            setShowDescriptionReq(descReq)
            setShowCategoryReq(catReq)
            setShowPriceReq(priceReq)
            setShowImageReq(imgReq)
        }
    }

    return (

        <div>
            <div>
                <div className='new-book-title'>
                    Title
                </div>
                <div className='title-input-container'>
                    <input type="text" placeholder="Book Title" className='title-input' onChange={(e) => setBookTitle(e.target.value)} value={bookTitle} />
                </div>
                {showTitleReq &&
                    <div className='req-message'>
                        *Title Required
                    </div>
                }
            </div>

            <div>
                <div className='new-book-title'>
                    Description
                </div>
                <div className='title-input-container'>
                    <textarea placeholder="Book Description" onChange={(e) => setBookDesc(e.target.value)} value={bookDesc} />
                </div>
                {showDescriptionReq &&
                    <div className='req-message'>
                        *Description Required
                    </div>
                }
            </div>

            <div>
                <div className='new-book-title'>
                    Category
                </div>

                <div className='title-input-container cursor-pointer ' onClick={() => setShowDropdown(!showDropdown)}>
                    <span className='title-input menu-dropdown-text'>{bookCategory === '' ? 'Category' : bookCategory}</span>
                    {showDropdown &&
                        <div className='dropdown'>
                            {categoryList.map((item) => (
                                item !== bookCategory &&
                                <div className='dropdown-item' onClick={() => setBookCategory(item)}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    }
                </div>
                {showCategoryReq &&
                    <div className='req-message'>
                        *Category Required
                    </div>
                }
            </div>

            <div>
                <div className='new-book-title'>
                    Price
                </div>
                <div className='title-input-container'>
                    <span className='price-input'>$</span>
                    <input type="number" placeholder="" min="1" step="0.01"className='price-input-box' onChange={(e) => setBookPrice(e.target.value)} value={bookPrice} />
                </div>
                {showPriceReq &&
                    <div className='req-message'>
                        *Price Required
                    </div>
                }
            </div>

            <div>
                <div className='new-book-title'>
                    Image
                </div>
                <div>
                    <input type="file" id='img-upload' className='file-upload' placeholder="Book Title" onChange={onImageChange} />
                    <label for='img-upload' className='image-upload'>Upload Image</label>
                </div>
                {showImageReq &&
                    <div className='req-message'>
                        *Image Required
                    </div>
                }
                {bookImage !== '' &&
                    <img src={bookImage} className='book-image' alt='book-image' />
                }
            </div>


            <div className='new-book-footer'>
                <div onClick={addBookToShelf} className='edit-button'>
                    {props.selectedBook ? 'Save' : 'Add'}
                </div>
                <div className='delete-button' onClick={props.selectedBook ? props.cancelEdit : reset}>
                    Cancel
                </div>
            </div>

        </div>

    )
}