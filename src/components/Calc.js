import React, { Component, Fragment } from 'react';

export class Calc extends Component {
	state = {
		display: 0,
		nums: [0, 0],
		index: 0,
		opr: '',
	};

	calculate = () => {
		const { nums } = this.state;
		nums[0] =
			this.state.opr === '+'
				? nums[0] + nums[1]
				: this.state.opr === '-'
				? nums[0] - nums[1]
				: this.state.opr === '*'
				? nums[0] * nums[1]
				: nums[0] / nums[1];
		nums[1] = 0;
		this.setState({ display: nums[0], nums, opr: '' });
	};

	handleClick = (e) => {
		const { nums, index } = this.state;
		switch (e.target.innerText) {
			case '+':
			case '-':
			case '/':
			case '*':
				nums[0] !== 0 && nums[1] !== 0 && this.calculate();
				this.setState({ opr: e.target.innerText, index: 1 });
				break;
			case '=':
				this.calculate();
				break;

			default:
				let n = Number(e.target.innerText);
				nums[index] = nums[index] * 10 + n;
				this.setState({ display: nums[index], nums });
				break;
		}
	};

	render() {
		// prettier-ignore
		let digits = ["1","2","3","+","4","5","6","-","7","8","9","*","C","0","=","/"];
		let buttons = digits.map((digit, i) => (
			<Fragment key={i}>
				<button style={{ width: '50px', height: '50px', fontSize: '14pt' }} onClick={this.handleClick}>
					{digit}
				</button>
				{(i + 1) % 4 === 0 ? <br /> : null}
			</Fragment>
		));
		return (
			<div>
				<div
					style={{
						margin: '0 auto',
						width: '200px',
						height: '20px',
						border: '1px solid #808080',
						font: 'bold 14pt Arial',
						textAlign: 'right',
						padding: '5px',
					}}
				>
					{this.state.display}
				</div>
				<div>{buttons}</div>
				<div style={{ textAlign: 'left' }}>
					<pre>{JSON.stringify(this.state, null, '  ')}</pre>
				</div>
			</div>
		);
	}
}

export default Calc;
