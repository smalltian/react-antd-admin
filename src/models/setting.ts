import { Reducer } from 'umi';
import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';

export interface SettingoModelType {
  namespace: string;
  state: DefaultSettings;
  reducers: {
    changeSetting: Reducer<DefaultSettings>;
  };
}

const updateColorWeak: (colorWeak: boolean) => void = colorWeak => {
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

// 项目配置 model
const SettingModel: SettingoModelType = {
  namespace: 'setting',
  state: defaultSettings,
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      const { colorWeak, contentWidth } = payload;
      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(!!colorWeak);
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default SettingModel;
