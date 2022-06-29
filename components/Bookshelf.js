import Book from './Book'
import { useSelector, useDispatch } from 'react-redux';
import { setBooks } from '../store/bookSlice';
import React, { useState, useRef } from 'react';
import { Modal, Col } from 'react-bootstrap';

import NewBook from './NewBook';

const Bookshelf = (props) => {
    const dispatch = useDispatch();
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState('');
    const [showSelectedBook, setShowSelectedBook] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState('')
    const [search, setSearch] = useState('');

    const ref = useRef(null)

    const refArray = useRef([]);
    refArray.current = [];
    const books = useSelector((state) => state.books.books)

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

    const refIndex = [];

    const addToRefs = (el) => {
        if (el && !refArray.current.includes(el)) {
            refArray.current.push(el)
        }
    }

    const showModal = (value) => {
        setShowAddModal(value);
    }

    const editBook = () => {
        setShowAddModal(true);
        setShowSelectedBook(false);
    }

    const cancelEdit = () => {
        setShowAddModal(false);
        setShowSelectedBook(true);
    }

    const deleteBook = () => {
        let temp = [...books];
        console.log(temp)
        temp.splice(temp.indexOf(selectedBook), 1);
        dispatch(setBooks(temp))
        setSelectedIndex('')
        setSelectedBook('')
        setShowSelectedBook(false)
    }

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    }

    const scrollOther = (scrollOffset, index) => {
        refArray.current[refIndex.indexOf(index)].scrollLeft += scrollOffset;

    }

    const filteredBooks = books.filter((item) => {
        if (search === '') {
            return item;
        }
        else {
            return item.title.toLowerCase().includes(search)
        }
    })

    const checkCategory = (cateogory) => {
        const bookList = books.filter((item) => {
            if (item.category === cateogory) {
                if (search === '') {
                    return item;
                }
                else {
                    return item.title.toLowerCase().includes(search)
                }
            }
        })
        return bookList;
    }

    return (
        <>
            <div className='header'>
                Blazesoft Frontend Assessment
            </div>

            <div className='main-container'>
                <div className='search-bar'>
                    <input type='text' placeholder='Search Book' onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className='bookshelf-main-container'>
                    <div className='bookshelf-header'>
                        All
                    </div>
                    <div className='bookshelf-container'>
                        {filteredBooks.length > 5 &&
                            <div className='caret-left' onClick={() => scroll(-350)}>
                                <img src='/static/images/caretLeft.svg' alt='caretRight' />
                            </div>
                        }
                        <div className='bookshelf' ref={ref}>
                            <div onClick={() => { setShowAddModal(!showAddModal); setSelectedBook('') }} >
                                <div className='add-button'>
                                    <img src='/static/images/addButton.svg' className='plus-sign' alt='add button' />
                                    <span className='plus-sign'>
                                        Add
                                    </span>
                                </div>
                            </div>
                            {filteredBooks.map((item, index) => (
                                <>
                                    <div className='bookContainer' onClick={() => { setSelectedBook(item); setShowSelectedBook(true); setSelectedIndex(index) }}>
                                        <Book item={item} index={index} />
                                    </div>
                                </>
                            ))
                            }
                        </div>
                        {filteredBooks.length > 5 &&
                            <>
                                <div className='caret-right' onClick={() => scroll(350)}>
                                    <img src='/static/images/caretRight.svg' alt='caretRight' />
                                </div>
                            </>
                        }
                    </div>
                </div>

                {categoryList.map((item, index) => (
                    <>
                        {checkCategory(item).length > 0 &&
                            <>
                                <div className='display-none'>
                                    {refIndex.push(index)}
                                </div>
                                <div className='bookshelf-main-container'>
                                    <div className='bookshelf-header'>
                                        {item}
                                    </div>
                                    <div className='bookshelf-container'>
                                        {checkCategory(item).length > 5 &&
                                            <div className='caret-left' onClick={() => scrollOther(-350, index)}>
                                                <img src='/static/images/caretLeft.svg' alt='caretRight' />
                                            </div>
                                        }
                                        <div className='bookshelf' ref={addToRefs}>
                                            {checkCategory(item).map((item, index) => (
                                                <>
                                                    <div className='bookContainer' onClick={() => { setSelectedBook(item); setShowSelectedBook(true); setSelectedIndex(index) }}>
                                                        <Book item={item} index={index} />
                                                    </div>
                                                </>
                                            ))
                                            }
                                        </div>
                                        {checkCategory(item).length > 5 &&
                                            <div className='caret-right' onClick={() => scrollOther(350, index)}>
                                                <img src='/static/images/caretRight.svg' alt='caretRight' />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </>
                        }
                    </>
                ))}
                <Modal
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                    centered
                >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body >
                        <NewBook showModal={showModal} selectedBook={selectedBook} selectedIndex={books.indexOf(selectedBook)} books={books} cancelEdit={cancelEdit} />
                    </Modal.Body>
                </Modal>
                <Modal
                    show={showSelectedBook}
                    onHide={() => { setShowSelectedBook(false); setSelectedBook(''); setSelectedIndex('') }}
                    centered
                >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body >
                        <div className='selected-book-data'>
                            <Col xs={12} md={7} >
                                <div className={'selected-book-image-container'}>
                                    <img src={selectedBook && selectedBook.image && selectedBook.image} className='selected-book-image' alt='book cover' />
                                </div>
                            </Col>
                            <Col xs={12} md={5} >
                                <div className='selected-book-container'>
                                    <div>
                                        <div className='selected-book-title'>
                                            {selectedBook && selectedBook.title && selectedBook.title}
                                        </div>
                                        <div className='price-cat-split'>
                                            <Col xs={6}>
                                                <div className='selected-book-price'>
                                                    {`$${selectedBook && selectedBook.price && selectedBook.price}`}
                                                </div>
                                            </Col>
                                            <Col xs={6} className='text-align-right'>
                                                <div>
                                                    <div className='category-header'>
                                                        Category
                                                    </div>
                                                    <div>
                                                        {selectedBook && selectedBook.category && selectedBook.category}
                                                    </div>
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                    <div className='selected-book-footer'>
                                        <div onClick={editBook} className='edit-button'>
                                            Edit
                                        </div>
                                        <div onClick={deleteBook} className='delete-button'>
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </div>
                        <div className='selected-book-desc-header'>
                            Description
                        </div>
                        <div className='selected-book-desc'>
                            {selectedBook && selectedBook.description && selectedBook.description}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};

export default Bookshelf;