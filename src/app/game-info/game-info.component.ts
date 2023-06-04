import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Ladies', description: 'All ladies take a sip.' },
    {
      title: 'Never have I ever',
      description: 'Everyone who has never done something takes a drink.',
    },
    {
      title: 'Rhyme time',
      description:
        "Come up with a word that rhymes with the previous one. If you can't, take a sip.",
    },
    {
      title: 'Categories',
      description:
        "Choose a category (e.g., fruits). Players take turns naming items from that category. The first person who can't think of one drinks.",
    },
    {
      title: 'Thumb master',
      description:
        'Whenever the thumb master puts their thumb on the table, everyone must do the same. The last person to do so takes a drink.',
    },
    {
      title: 'Waterfall',
      description:
        'Everyone starts drinking, and no one can stop until the person to their right stops.',
    },
    {
      title: 'Truth or dare',
      description:
        'Choose truth or dare. If you refuse to answer or perform the dare, take a drink.',
    },
    {
      title: 'Finish your drink',
      description: 'Everyone finishes their drink.',
    },
    {
      title: 'Question master',
      description:
        'Become the question master. Whenever someone answers a question you ask, they take a drink.',
    },
    {
      title: 'Snake eyes',
      description: 'Roll two dice. If you get a pair of ones, take a drink.',
    },
    {
      title: 'Make a rule',
      description:
        'Create a rule that everyone must follow. Anyone who breaks it takes a sip.',
    },
    {
      title: 'Cheers',
      description: 'Everyone clinks glasses and takes a drink.',
    },
    {
      title: 'Storytime',
      description:
        'Start a story with one sentence. Each person adds one sentence, and the first person to mess up drinks.',
    },
    {
      title: 'Celebrity names',
      description:
        "Say the name of a celebrity. The next person must say a celebrity name starting with the last letter of the previous name. If you can't, drink.",
    },
    {
      title: 'The floor is lava',
      description:
        "When someone yells 'The floor is lava,' everyone has five seconds to find a higher surface. The last person to do so drinks.",
    },
    {
      title: 'Toastmaster',
      description:
        "Give a toast to someone at the table. If you can't, take a sip.",
    },
    {
      title: 'Two truths and a lie',
      description:
        "Say two true statements and one false statement about yourself. Others must guess the lie. If they're wrong, they drink.",
    },
    {
      title: 'Name game',
      description:
        "Choose a category (e.g., colors). Players take turns naming items from that category. If you repeat or can't think of one, drink.",
    },
    {
      title: 'Dancing queen',
      description:
        'The person who drew this card must dance until someone else draws a card. If they stop, they drink.',
    },
    { title: 'Social', description: 'Everyone takes a drink together.' },
  ];
  title = '';
  description = '';
  @Input() card: string;

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
