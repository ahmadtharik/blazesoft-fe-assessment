import React from 'react';
export default function Book(props) {

    return (
        <div >
            <div className='book' key={props.index}>
                <div>
                    <img src={props.item.image} alt='book-cover' className='coverImage' />
                </div>
                <div className='bookTitle'>
                    {props.item.title}
                </div>
                <div className='bookPrice'>
                    {`$ ${props.item.price}`}
                </div>
                <div className='bookTextCenter'>
                    {props.item.category}
                </div>
            </div>
        </div>
    )
}