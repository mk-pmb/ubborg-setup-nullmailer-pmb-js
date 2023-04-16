
<!--#echo json="package.json" key="name" underline="=" -->
ubborg-setup-nullmailer-pmb
===========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Config template for my nullmailer setup.
<!--/#echo -->



API
---

This module exports one function:

### setup(bun[, opt])

`bun` is an ubborg bundle in whose name the resources shall be requested.

`opt` is an optional options object that supports these optional keys:

* `fqdn`: Full hostname which nullmailer should use to refer to itself as
  the originating mail server.
* `adminaddr`: Default recipient email address.
* `defaultdomain`: Usually the domain part of the FQDN.
  For details, please see the nullmailer docs.
* `remotes`: Usually the hostname of a remote SMTP server.
  For details, please see the nullmailer docs.
* `tryPreventOfflineLogSpam`: (boolean, default: `false`)
  Nullmailer tends to spam system logs if it's running while your device is
  offline. To help prevent this, we can install some overly simple if-up
  hooks that will probably work for very simple network setups.
  * __⚠ Beware: ⚠__
    These hooks may stop or start nullmailer at unfortunate times when you
    have virtual network devices or tunnels or docker network stuff.






<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
