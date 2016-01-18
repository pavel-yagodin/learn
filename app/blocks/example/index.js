import $ from 'jquery';

export default class {
	constructor() {
		this.$el = $('.js-example');
		this.targetsSelector = '.js-example-target';
		this.bemSelector = '.js-bem';
		this.codeSelector = '.js-code';
		this.hoverSelector = [this.bemSelector, this.codeSelector].join(', ');
		this.hoverBemClass = 'bem_state_hover';
		this.hoverCodeClass = 'code_state_hover';
		return this;
	}

	onHover($targets, key, over) {
		const example = this;
		const targetkey = key;
		const isOver = over;
		$targets.each(function () {
			const $target = $(this);
			const $hovers = $target.find(example.hoverSelector);
			$hovers.each(function (currentKey) {
				const $hover = $(this);
				if (targetkey === currentKey) {
					$hover
						.closest(example.hoverSelector)
						.filter(example.bemSelector)
						.toggleClass(example.hoverBemClass, isOver);

					$hover
						.closest(example.hoverSelector)
						.filter(example.codeSelector)
						.toggleClass(example.hoverCodeClass, isOver);
				}
			});
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
				$hovers.each(function (currentKey) {
					const $hover = $(this);
					$hover
						.on('mouseover', example.onHover.bind(example, $targets, currentKey, true))
						.on('mouseout', example.onHover.bind(example, $targets, currentKey, false));
				});
			});
		});

		return example;
	}
}
