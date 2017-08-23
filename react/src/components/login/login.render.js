import React from 'react';
import { translate } from '../../translate/translate';
import LoginSettingsModal from '../dashboard/loginSettingsModal/loginSettingsModal';

const LoginRender = function () {
  return (
    <div>
      <LoginSettingsModal
        {...this.props}
        section={ this.state.displayLoginSettingsDropdownSection } />
      { this.renderSwallModal() }
      <div className="page animsition vertical-align text-center fade-in">
        <div className="page-content vertical-align-middle col-xs-12 col-sm-6 col-sm-offset-3">
          <div className="brand">
            <img
              className="brand-img"
              src="assets/images/agama-login-logo.svg"
              width="200"
              height="160"
              alt="SuperNET Iguana" />
          </div>

          <div className="login-settings-dropdown margin-bottom-30">
            <div>
              <span
                className="login-settings-dropdown-trigger"
                onClick={ this.toggleLoginSettingsDropdown }>
                <i className="icon fa-cogs"></i>&nbsp;
                <span className="login-settings-dropdown-label">{ translate('LOGIN.QUICK_ACCESS') }</span>
              </span>
            </div>
            <div>
              <ul className={ this.state.displayLoginSettingsDropdown ? 'dropdown-menu show' : 'hide' }>
                <li>
                  <a onClick={ () => this.toggleLoginSettingsDropdownSection('settings') }>
                    <i className="icon md-settings"></i> { translate('INDEX.SETTINGS') }
                  </a>
                </li>
                <li className={ this.state.nativeOnly ? 'hide' : '' }>
                  <a onClick={ this.openSyncOnlyModal }>
                    <i className="icon fa-cubes"></i> { translate('ADD_COIN.SYNC_ONLY') }
                  </a>
                </li>
                <li>
                  <a onClick={ () => this.toggleLoginSettingsDropdownSection('about') }>
                    <i className="icon fa-users"></i> { translate('INDEX.ABOUT_IGUANA') }
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={ this.state.activeLoginSection === 'login' && !this.state.nativeOnly ? 'show' : 'hide' }>
            <h4 className="color-white">
              { translate('INDEX.WELCOME_LOGIN') }
            </h4>
            <div className="form-group form-material floating col-sm-12 horizontal-padding-0">
              <input
                type="password"
                className={ !this.state.seedInputVisibility ? 'form-control' : 'hide' }
                name="loginPassphrase"
                onChange={ this.updateLoginPassPhraseInput }
                onKeyDown={ (event) => this.handleKeydown(event) }
                value={ this.state.loginPassphrase } />
              <textarea
                className={ this.state.seedInputVisibility ? 'form-control' : 'hide' }
                id="loginPassphrase"
                name="loginPassphrase"
                onChange={ this.updateLoginPassPhraseInput }
                onKeyDown={ (event) => this.handleKeydown(event) }
                value={ this.state.loginPassphrase }></textarea>
              <i
                className={ 'seed-toggle fa fa-eye' +  (!this.state.seedInputVisibility ? '-slash' : '') }
                onClick={ this.toggleSeedInputVisibility }></i>
              <label
                className="floating-label"
                htmlFor="inputPassword">{ translate('INDEX.WALLET_SEED') }</label>
            </div>
            { this.state.loginPassPhraseSeedType &&
              <div
                className="form-group form-material floating horizontal-padding-0 margin-top-20 seed-type-block"
                style={{ width: `${this.state.loginPassPhraseSeedType.length * 8}px` }}>
                <div className="placeholder-label">{ this.state.loginPassPhraseSeedType }</div>
              </div>
            }
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={ this.loginSeed }
              disabled={ !this.state.loginPassphrase || !this.state.loginPassphrase.length }>{ translate('INDEX.SIGN_IN') }</button>
            <div className="form-group form-material floating">
              <button
                className="btn btn-lg btn-flat btn-block waves-effect"
                id="register-btn"
                onClick={ () => this.updateActiveLoginSection('signup') }>{ translate('INDEX.CREATE_WALLET') }</button>
              <button
                className="btn btn-lg btn-flat btn-block waves-effect hide"
                id="logint-another-wallet">{ translate('INDEX.LOGIN_ANOTHER_WALLET') }</button>
              <button
                className="btn btn-lg btn-flat btn-block waves-effect margin-top-20"
                id="register-btn"
                onClick={ this.toggleActivateCoinForm }
                disabled={ !this.props.Main }>
                <span className="ladda-label">
                  { translate('ADD_COIN.ADD_ANOTHER_COIN') }
                </span>
              </button>
            </div>
          </div>

          <div className={ this.state.activeLoginSection === 'activateCoin' ? 'show' : 'hide' }>
            <h4 className="color-white">
              { translate('INDEX.WELCOME_PLEASE_ADD') }
            </h4>
            <div className="form-group form-material floating width-540 vertical-margin-30 auto-side-margin">
              <button
                className="btn btn-lg btn-primary btn-block ladda-button"
                onClick={ this.toggleActivateCoinForm }
                disabled={ !this.props.Main }>
                <span className="ladda-label">
                  { translate('INDEX.ACTIVATE_COIN') }
                </span>
              </button>
            </div>
          </div>

          <div className={ this.state.activeLoginSection === 'signup' ? 'show' : 'hide' }>
            <div className="register-form">
              <h4 className="hint color-white">
                { translate('INDEX.SELECT_SEED_TYPE') }:
              </h4>
              <div className="row">
                <div className="col-sm-5 horizontal-padding-0">
                  <div className="toggle-box vertical-padding-20">
                    <span className="pointer">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={ this.isCustomWalletSeed() } />
                        <div
                          className="slider"
                          onClick={ () => this.toggleCustomWalletSeed() }></div>
                      </label>
                      <div
                        className="toggle-label white"
                        onClick={ () => this.toggleCustomWalletSeed() }>
                          { translate('LOGIN.CUSTOM_WALLET_SEED') }
                      </div>
                    </span>
                  </div>
                </div>
                <div className="col-sm-7 horizontal-padding-0">
                { !this.isCustomWalletSeed() &&
                  <div>
                    <div className="form-group form-material floating">
                      <div
                        className="radio-custom radio-default radio-inline"
                        onClick={ () =>this.state.bitsOption !== 256 && this.generateNewSeed(256) }>
                        <input
                          type="radio"
                          name="PassPhraseOptions"
                          checked={ this.state.bitsOption === 256 }
                          readOnly />
                        <label htmlFor="PassPhraseOptionsIguana">
                          { translate('LOGIN.IGUANA_SEED') }
                        </label>
                      </div>
                      <div
                        className="radio-custom radio-default radio-inline"
                        onClick={ () => this.state.bitsOption !== 160 && this.generateNewSeed(160) }>
                        <input
                          type="radio"
                          name="PassPhraseOptions"
                          checked={ this.state.bitsOption === 160 }
                          readOnly />
                        <label htmlFor="PassPhraseOptionsWaves">
                          { translate('LOGIN.WAVES_SEED') }
                        </label>
                      </div>
                      <div
                        className="radio-custom radio-default radio-inline"
                        onClick={ () => this.state.bitsOption !== 128 && this.generateNewSeed(128) }>
                        <input
                          type="radio"
                          name="PassPhraseOptions"
                          checked={ this.state.bitsOption === 128 }
                          readOnly />
                        <label htmlFor="PassPhraseOptionsNXT">
                          { translate('LOGIN.NXT_SEED') }
                        </label>
                      </div>
                    </div>
                  </div>
                }
                </div>
              </div>

              <div className="form-group form-material floating seed-tooltip">
                <textarea
                  className="form-control placeholder-no-fix height-100"
                  type="text"
                  id="walletseed"
                  value={ this.state.randomSeed }
                  onChange={ (e) => this.updateWalletSeed(e) }
                  readOnly={ !this.isCustomWalletSeed() }></textarea>
                <button className="copy-floating-label"
                  htmlFor="walletseed"
                  onClick={ () => this.copyPassPhraseToClipboard() }>{ translate('INDEX.COPY') }</button>
                <span className={ this.state.isCustomSeedWeak ? 'tooltiptext' : 'hide' }>
                  <strong>{ translate('INDEX.WEAK_SEED') }</strong><br /><br />
                  { translate('INDEX.YOUR_SEED_MUST_CONTAIN') }<br />
                  { translate('INDEX.YOUR_SEED_MUST_CONTAIN1') }<br />
                  { translate('INDEX.YOUR_SEED_MUST_CONTAIN2') }<br />
                  { translate('INDEX.YOUR_SEED_MUST_CONTAIN3') }<br />
                  { translate('INDEX.YOUR_SEED_MUST_CONTAIN4') }
                </span>
                <label
                  className="floating-label"
                  htmlFor="walletseed">{ translate('INDEX.WALLET_SEED') }</label>
              </div>
              <div className="form-group form-material floating">
                <textarea
                  className="form-control placeholder-no-fix height-100"
                  type="text"
                  name="randomSeedConfirm"
                  value={ this.state.randomSeedConfirm }
                  onChange={ this.updateRegisterConfirmPassPhraseInput }
                  id="rwalletseed"></textarea>
                <span className={ this.state.isSeedBlank ? 'help-block' : 'hide' }>
                  { translate('LOGIN.MUST_ENTER_SEED') }.
                </span>
                <span className={ this.state.isSeedConfirmError ? 'help-block' : 'hide' }>
                  { translate('LOGIN.ENTER_VALUE_AGAIN') }.
                </span>
                <label
                  className="floating-label"
                  htmlFor="rwalletseed">{ translate('INDEX.CONFIRM_SEED') }</label>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={ this.handleRegisterWallet }>{ translate('INDEX.REGISTER') }</button>
              <div className="form-group form-material floating">
                <button
                  className="btn btn-lg btn-flat btn-block waves-effect"
                  id="register-back-btn"
                  onClick={ () => this.updateActiveLoginSection('login') }>{ translate('INDEX.BACK_TO_LOGIN') }</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRender;