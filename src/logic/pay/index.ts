import { useAlipay } from './alipay';
import { useWxPay } from './wx';
import { isWeixin } from '~/utils';

export const usePay = isWeixin ? useWxPay : useAlipay
