import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import Example from '../blocks/example';

$(() => svg4everybody());
$(() => new Example().render());
