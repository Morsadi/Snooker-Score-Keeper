import React from 'react';

export default function Foul(props) {
  const { closeFoul, submitFoul, foul, handleChecks, redCount } = props;

  return (
    <div id='foul'>
      <button id='closeBtn' onClick={closeFoul}>
        X
      </button>
      <h2>FOUL</h2>

      <form onChange={handleChecks} id='lostPoints'>
        <input
          id='4'
          type='radio'
          name='points'
          value='4'
          defaultChecked={foul.points === '4' ? true : false}
        />
        <label htmlFor='4'>4</label>
        <input
          id='5'
          type='radio'
          name='points'
          value='5'
          defaultChecked={foul.points === '5' ? true : false}
        />
        <label htmlFor='5'>5</label>
        <input
          id='6'
          type='radio'
          name='points'
          value='6'
          defaultChecked={foul.points === '6' ? true : false}
        />
        <label htmlFor='6'>6</label>
        <input
          id='7'
          type='radio'
          name='points'
          value='7'
          defaultChecked={foul.points === '7' ? true : false}
        />
        <label htmlFor='7'>7</label>
      </form>

      <form id='options'>
        <input onChange={handleChecks} type='checkbox' name='freeBall' />
        <label htmlFor='freeBall'>Free Ball</label>
        <br />
        <input onChange={handleChecks} type='checkbox' name='removeRed' />
        <label htmlFor='removeRed'>Remove Red</label>
      </form>
      <button onClick={submitFoul}>DONE</button>
    </div>
  );
}
