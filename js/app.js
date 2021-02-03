const svg = d3.select('#app')
  .append('svg')
  .attr('viewBox', '0 0 800 400')
  .attr('width', '100%')
  .attr('height', '400px');

const textDateMin = svg.append('text')
  .attr('text-anchor', 'middle')
  .attr('x', 200)
  .attr('y', 45)
  .text('RangeMin');

const textDateMax = svg.append('text')
  .attr('text-anchor', 'middle')
  .attr('x', 600)
  .attr('y', 45)
  .text('RangeMax');

const makeGroup = (svg) => {
  return svg.append('g')
    .attr('stroke', '#333')
    .attr('stroke-width', 2)
    .attr('fill', '#333');
};

const outLeftGroup = makeGroup(svg);

outLeftGroup.append('line')
  .attr('x1', 50)
  .attr('x2', 150)
  .attr('y1', 100)
  .attr('y2', 100);

outLeftGroup.append('circle')
  .attr('cx', 50)
  .attr('cy', 100)
  .attr('r', 3);

outLeftGroup.append('circle')
  .attr('cx', 150)
  .attr('cy', 100)
  .attr('r', 3);

const inLeftGroup = makeGroup(svg);

inLeftGroup.append('line')
  .attr('x1', 100)
  .attr('x2', 300)
  .attr('y1', 150)
  .attr('y2', 150);

inLeftGroup.append('circle')
  .attr('cx', 100)
  .attr('cy', 150)
  .attr('r', 3);

inLeftGroup.append('circle')
  .attr('cx', 300)
  .attr('cy', 150)
  .attr('r', 3);

const enclosedGroup = makeGroup(svg);

enclosedGroup.append('line')
  .attr('x1', 250)
  .attr('x2', 550)
  .attr('y1', 200)
  .attr('y2', 200);

enclosedGroup.append('circle')
  .attr('cx', 250)
  .attr('cy', 200)
  .attr('r', 3);

enclosedGroup.append('circle')
  .attr('cx', 550)
  .attr('cy', 200)
  .attr('r', 3);

const inRightGroup = makeGroup(svg);

inRightGroup.append('line')
  .attr('x1', 500)
  .attr('x2', 700)
  .attr('y1', 250)
  .attr('y2', 250);

inRightGroup.append('circle')
  .attr('cx', 500)
  .attr('cy', 250)
  .attr('r', 3);

inRightGroup.append('circle')
  .attr('cx', 700)
  .attr('cy', 250)
  .attr('r', 3);

const outRightGroup = makeGroup(svg);

outRightGroup.append('line')
  .attr('x1', 650)
  .attr('x2', 750)
  .attr('y1', 300)
  .attr('y2', 300);

outRightGroup.append('circle')
  .attr('cx', 650)
  .attr('cy', 300)
  .attr('r', 3);

outRightGroup.append('circle')
  .attr('cx', 750)
  .attr('cy', 300)
  .attr('r', 3);

const extendsGroup = makeGroup(svg);

extendsGroup.append('line')
  .attr('x1', 75)
  .attr('x2', 725)
  .attr('y1', 350)
  .attr('y2', 350);

extendsGroup.append('circle')
  .attr('cx', 75)
  .attr('cy', 350)
  .attr('r', 3);

extendsGroup.append('circle')
  .attr('cx', 725)
  .attr('cy', 350)
  .attr('r', 3);

const rangeMinLine = svg.append('line')
  .attr('x1', '200')
  .attr('x2', '200')
  .attr('y1', '50')
  .attr('y2', '380')
  .attr('stroke', '#333')
  .attr('stroke-width', '2');

const rangeMaxLine = svg.append('line')
  .attr('x1', '600')
  .attr('x2', '600')
  .attr('y1', '50')
  .attr('y2', '380')
  .attr('stroke', '#333')
  .attr('stroke-width', '2');

const dateRangeElms = [outLeftGroup, inLeftGroup, enclosedGroup, inRightGroup, outRightGroup, extendsGroup];

const code = document.getElementById('filterExpression');
const explanation = document.getElementById('explanation');

document.getElementById('select').addEventListener('change', (e) => {
  dateRangeElms.forEach(_ => makeInactive(_));

  const filter = e.target.value;

  switch (filter) {
    case 'reset':
      dateRangeElms.forEach(_ => reset(_));
      code.textContent = 'Please select a date range filter...'
      break;

    case 'beforeRange':
      beforeRange();
      break;

    case 'startsBeforeRangeMin':
      startsBeforeRangeMin();
      break;

    case 'startsAfterRangeMin':
      startsAfterRangeMin();
      break;

    case 'startOrEndWithinRange':
      startOrEndWithinRange();
      break;

    case 'startsAndEndsWithinRange':
      startsAndEndsWithinRange();
      break;

    case 'afterRange':
      afterRange();
      break;

    case 'outsideRange':
      outsideRange();
      break;

    case 'involvingRange':
      involvingRange();
      break;

    default:
      break;
  }
});

function beforeRange() {
  makeActive(outLeftGroup);
}

function startsBeforeRangeMin() {
  makeActive(outLeftGroup);
  makeActive(inLeftGroup);
  makeActive(extendsGroup);
}

function startsAfterRangeMin() {
  makeActive(enclosedGroup);
  makeActive(inRightGroup);
  makeActive(outRightGroup);
}

function startOrEndWithinRange() {
  makeActive(inLeftGroup);
  makeActive(enclosedGroup);
  makeActive(inRightGroup);
}

function startsAndEndsWithinRange() {
  makeActive(enclosedGroup);
}

function afterRange() {
  makeActive(outRightGroup);
}

function outsideRange() {
  makeActive(outLeftGroup);
  makeActive(outRightGroup);
}

function involvingRange() {
  makeActive(inLeftGroup);
  makeActive(enclosedGroup);
  makeActive(inRightGroup);
  makeActive(extendsGroup);
}

function makeActive(group) {
  group.attr('stroke', '#383')
    .attr('fill', '#383');
}

function makeInactive(group) {
  group.attr('stroke', '#ccc')
    .attr('fill', '#ccc');
}

function reset(group) {
  group.attr('stroke', '#333')
    .attr('fill', '#333');
}
