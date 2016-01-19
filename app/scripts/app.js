import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import Selection from '../blocks/selection';

$(() => svg4everybody());
$(() => new Selection().render());
