// -*- coding: utf-8, tab-width: 2 -*-

import sysFactsHelper from 'ubborg-sysfacts-helper-pmb';
import objPop from 'objpop';
import mustBe from 'typechecks-pmb/must-be';

import pkgMeta from './package.json';


const EX = async function setup(bun, opt) {
  const netCfg = await sysFactsHelper.mtd(bun, 'network')();
  const { fqdn, nullmailer } = netCfg;
  const how = { fqdn, ...nullmailer, ...opt };
  const popHow = objPop(how, { mustBe }).mustBe;
  function popOpt(k) { return popHow('nonEmpty str', k); }

  const cfgFiles = [
    { path: '/etc/mailname', content: popOpt('fqdn') },
    ...[
      'adminaddr',
      'defaultdomain',
      'remotes',    // upstream SMTP server
    ].map(k => ({ path: '/etc/nullmailer/' + k, content: popOpt(k) })),
  ];

  EX.maybeRegisterSimpleIfUpHooks(popHow, cfgFiles);

  popHow.done(pkgMeta.name + ': Unsupported options');

  await bun.needs('admTextLinesFile', cfgFiles);
  await bun.needs('debPkg', 'nullmailer');
};


Object.assign(EX, {


  registerSimpleIfUpHooks(popHow, cfgFiles) {
    // For description see README.md about this option:
    const optName = 'tryPreventOfflineLogSpam';

    const onlineOnly = popHow('bool | undef', optName);
    if (!onlineOnly) { return; }

    const h = function h(event, action) {
      cfgFiles.push({
        path: '/etc/network/if-' + event + '.d/nullmailer.sh',
        content: '#!/bin/sh\nsystemctl ' + action + ' nullmailer',
      });
    };
    h('down', 'stop');
    h('up', 'restart');
  },


});



export default EX;
