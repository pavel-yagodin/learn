import $ from 'jquery';

export default class {
	constructor() {
		this.$el = $('.js-selection');
		this.targetsSelector = '.js-selection-connect';
		this.exampleSelector = '.js-selection-example';
		this.codeSelector = '.js-selection-code';
		this.hoverSelector = [this.exampleSelector, this.codeSelector].join(', ');
		this.hoverExampleClass = 'example__element_state_hover';
		this.hoverCodeClass = 'code__line_state_hover';
		return this;
	}

	onHover($targets, way, over) {
		const example = this;
		const isWay = way;
		const isOver = over;
		$targets.each(function () {
			const $target = $(this);
			const $hovers = $target.find(example.hoverSelector);
			if (!isOver) {
				$hovers
					.removeClass(example.hoverExampleClass)
					.removeClass(example.hoverCodeClass);
			} else {
				const $way = $hovers.filter('[data-way="' + isWay + '"]');

				$way
					.closest(example.hoverSelector)
					.filter(example.exampleSelector)
					.addClass(example.hoverExampleClass);

				$way
					.closest(example.hoverSelector)
					.filter(example.codeSelector)
					.addClass(example.hoverCodeClass);
			}
		});
		return example;
	}

	render() {
		const example = this;
		example.$el.each(function () {
			const $example = $(this);
			const $targets = $example.find(example.targetsSelector);
			$targets.each(function () {
				const $target = $(this);
				const $hovers = $target.find(example.hoverSelector);
				$hovers.each(function () {
					const $hover = $(this);
					$hover
						.on('mouseover', example.onHover.bind(example, $targets, $hover.data('way'), true))
						.on('mouseout', example.onHover.bind(example, $targets, $hover.data('way'), false));
				});
			});
		});

		return example;
	}
}
