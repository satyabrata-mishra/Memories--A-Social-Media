import React from 'react'
import styled from 'styled-components'

export default function Commentbar({name,message,owner}) {
    return (
        <Container style={owner?{"marginLeft": "6.5rem","backgroundColor":"#424143","color":"white"}:{}}>
            <p className='name'>{name}</p>
            <p className='message'>{message}</p>
           <br />
        </Container>
    )
}
const Container = styled.div`
    max-width: 15rem;
    min-height: 0rem;
    background-color: pink;
    border-radius: 5px;
    font-size: 0.8rem;
    padding-left: 0.3rem;
    display: flex;
    flex-direction: column;
    margin: 0.4rem 0;
    .name{
        font-weight: 900;
    }
    .message{
        margin: -0.5rem 0;
        font-weight: 500;
    }
`;