import validator from 'validator';
import { PaymentChannels } from './types';
 

const { isDecimal, isFloat, isInt, toFloat, toInt } = validator;

type AmountValue = string | number;

function isNumber(value: any): boolean {
  return typeof value === 'number';
}

function isString(value: any): boolean {
  return typeof value === 'string';
}

export function isValidStringAmount(stringAmount: string): boolean {
  if (isString(stringAmount) && stringAmount?.endsWith('.')) {
    return false;
  }

  return isDecimal(stringAmount);
}

export function isValidDecimalMonetaryValue(amountValue: AmountValue | any): boolean {
  if (!isNumber(amountValue) && !isString(amountValue)) {
    return false;
  }

  return isNumber(amountValue) || isValidStringAmount(amountValue);
}

export function isNegative(amountValue: AmountValue): boolean {
  if (typeof amountValue === 'string') {
    return amountValue.startsWith('-');
  }
  return amountValue < 0;
}

export function toNumber(string: string): number {
  if (isFloat(string)) {
    return toFloat(string);
  }

  if (isInt(string)) {
    return toInt(string);
  }
  return +string;
}

export function toString(amountValue: AmountValue) {
  return isNumber(amountValue) ? amountValue.toString() : amountValue;
}

export function toAmountInKobo(amountValue: AmountValue) {
  if (typeof amountValue === 'string') {
    return toNumber(amountValue) * 100;
  }
  return amountValue * 100;
}

export const getAmountValueInKobo = (amount: AmountValue): number => {
  if (isValidDecimalMonetaryValue(amount)) {
    return toAmountInKobo(amount);
  }
  return 0;
};

export const getChannels = (channelsArrary: PaymentChannels[]) => {
  if (channelsArrary?.length > 0) {
    const channelsString = JSON.stringify(channelsArrary);
    return `channels: ${channelsString},`;
  }
  return '';
};

	// Color Functions
	export const getRandomColor = () => {
		const colors = ['#00539C', '#00A52C', '#FF8C00', '#C67003', '#14539A', '#462A68', '#02393E', '#275D2B', '#660D33', '#6F4439'];
		return colors[Math.floor(Math.random() * colors.length)];
	};

	export const getContrastingColor = (color: string) => {
		const r = parseInt(color.slice(1, 3), 16);
		const g = parseInt(color.slice(3, 5), 16);
		const b = parseInt(color.slice(5, 7), 16);
		const invertedColor = `#${(0xFFFFFF ^ (r << 16 | g << 8 | b)).toString(16).padStart(6, '0')}`;
		return invertedColor;
	};
  