import React from 'react';

import { Link } from 'react-router-dom';

import './NotFoundComponent.css';


const QUESTIONS = [ 'What to listen to now?', 'Who let the dogs out?', 'Who’s your daddy?', 'Damn son where’d ya find this?', 'Where is my mind?', 'Where is my money?', 'Should I stay or should I go?', 'Do I?', 'What is the way to Kaunas?', 'What\'s going on?', 'Could you be loved?', 'What is love?', 'Who is Finds and what does he find?', 'W̷̨̯̭͇̣̭͔̳͖͕̩̥̯̰͔̣̿̆͌͑ͅḣ̵̡̡̛̛̭̖͕̫̩͚͚̘̹̣̝̮̞̥͖̝͈́̈̃̍̆̈́̔̓̈́͋̀͌̾̏̓̏̇̈́̕̕͘͜͜͝͝͝ͅa̷̲͐͊̒̔́̿͊̏̈́̿͐́̂̍͆̃̌͊̈́̕̕̕͠t̵̡̨̡̠̻͍̰̗̣͔̖͍̭̣̘̼̩̗͚̞̬͊̉̅͌̎̄̔͗̑͛̓̇̆̃̿̕̚͝͠ ̴͇̞͈̜̞͍̺̳̈́̅̾͌̓̇̀̍̅͒͋͆̀̅̿̌̉̒̃̓̕͜͝͝͝͝ị̵̤̻̥̥̗̰̮͙̗̺̺̬̻̰́͂̎̂͆̈̍̀͑͐̾̈́͘͜ͅs̵͖͉̎̂͆̀̽̀̂͛̾̓̊̏̽̂̇̊̓̔̎̈̏̎̈́̒͘̚̕͝ ̵̢̡̛̻̜͈̺̳͕̝̥̫̗̱̰͔̘̹͕̦͎͉͓̭̘̙̈́́̈́́̒̅̓͂̓̈́͑̄̽̓́̀̓̑́̓̚͝g̸̛͈̟̭̀̉̊̋̏̂ơ̷̧̢̢̡̲̹̭̥̺̩͙̯̩̯̦̩̙̗͇̤̜̳̹̖͈̜̹͋̏̀̉̓̋̈́̄͆͑̇̅̕͘ḯ̵̛̩͖̮̥̲̮̗͍͓͋̈́́͆͆͆͂͑̒͒̈͗̀͊͝ͅn̴̛̛̖͒̎̐̌͑͐̾́̏̾̐̒͆̍̂̀̔͂̆̚͝g̸̥̲̳͍̥̾̊́̇ ̵̱̜̜̪̤͚̩̳̺̗̽͜ȏ̸͖͇̇́͛̒̆̓̀̿̈́̾͊̉͑̆̽̊̒̎̒̋̕̚̕͠n̶̺̼̭̘̜͙̹͖̫̼̝͇̫͌̓̿͌͋̂̀͒̆̇͠?̷̨̢͇̜͔̙̻̦̭̻̰̪̼̣̪͙̳̥̗̦̭͍̀̀̀̀͒͆͜͠', 'Why?', 'Why does it always rain on me?', 'Why does my heart feels so bad?', '00110010 00110000 00110010 00110000?', 'Why don\'t we always get what we want?', 'Is there life on Mars?', 'Anybody seen my baby?', 'Where have all the cowboys gone?', 'What are numbers?', 'Who rather to be - an unhappy human being or a happy dog?', 'Can food be art?', 'What about fish, oysters and tomatoes?', 'How much is the fish?', 'Is it true or false?', 'What makes you, you?', 'How to keep your cat happy indoors?' ]

export function NotFoundComponent() {
    const question = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];

    return (
        <div className='not-found-container'>
            <h1>404</h1>
            <Link to='/' className='question-link'><h3>However, Radio Plato still solves an eternal question: '{ question }'</h3></Link>
        </div>
    );
}