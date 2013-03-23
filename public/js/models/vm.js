define(function(require) {
    var Model = require('model');
    var Job = require('models/job');
    var Vm = Model.extend({
        urlRoot: '/_/vms',

        idAttribute: 'uuid',

        defaults: {
            nics: [],
            snapshots: []
        },

        update: function(attrs, cb) {
            $.post(this.url()+'?action=update', attrs, function(data) {
                var job = new Job({uuid: data.job_uuid});
                cb(job);
            });
        },

        start: function(cb) {
            $.post(this.url()+'?action=start', {}, function(data) {
                var job = new Job({uuid: data.job_uuid});
                cb(job);
            });
        },

        stop: function(cb) {
            $.post(this.url()+'?action=stop', {}, function(data) {
                var job = new Job({uuid: data.job_uuid});
                cb(job);
            });
        },

        reboot: function(cb) {
            $.post(this.url()+'?action=reboot', {}, function(data) {
                var job = new Job({uuid: data.job_uuid});
                cb(job);
            });
        },

        del: function(cb) {
            $.delete_(this.url(), function(data) {
                var job = new Job({uuid: data.job_uuid});
                cb(job);
            });
        },

        saveTags: function(cb) {
            $.put(this.url() + '/tags', this.get('tags'), cb);
        },

        createSnapshot: function(cb) {
            $.post(this.url()+'?action=create_snapshot',{}, function(data) {
                var job = new Job({uuid: data.job_uuid});
                cb(job);
            });
        },

        rollbackSnapshot: function(snapshotName, cb) {
            $.post(this.url()+'?action=rollback_snapshot', { name: snapshotName }, function(data) {
                var job = new Job({uuid: data.job_uuid});
                cb(job);
            });
        },

        addNics: function(networks, cb) {
            $.post(this.url()+'?action=add_nics', {networks: networks}, function(data) {
                var job = new Job({uuid: data.job_uuid});
                cb(job);
            });
        },

        removeNics: function(macs, cb) {
            $.post(this.url()+'?action=remove_nics', {macs: macs}, function(data) {
                var job = new Job({uuid: data.job_uuid});
                cb(job);
            });
        },


        saveAlias: function(cb) {
            $.put(this.url(), {
                alias: this.get('alias')
            }, cb);
        },

        saveCustomerMetadata: function(cb) {
            $.put(this.url() + '/customer_metadata', this.get('customer_metadata'), cb);
        },

        ips: function() {
            return this.get('nics').map(function(n) {
                return n.ip;
            });
        }
    });

    return Vm;
});