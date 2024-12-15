### before allocating egress IP

 [info]Running cron job to fetch egress IP...
2024-12-15T14:24:30Z app[7811ee1c425118] hkg [info]Egress IP from https://api.ipify.org: 75.102.32.71
2024-12-15T14:24:42Z app[7811ee1c425118] hkg [info]2024/12/15 14:24:42 INFO New SSH session email=tripathi.abhishek.iitkgp@gmail.com verified=true
2024-12-15T14:25:00Z app[7811ee1c425118] hkg [info]Running cron job to fetch egress IP...
2024-12-15T14:25:00Z app[7811ee1c425118] hkg [info]Egress IP from https://ipv4.icanhazip.com: 75.102.32.71


---- 
the outward IP is given by fly. 



When doing `fly ssh console` and doing `curl icanhazip.com` 

```sh
FLY_API_TOKEN=$FLY_IITKGP_TOKEN  fly ssh console
Connecting to fdaa:2:5161:a7b:1d7:f6fb:4b6b:2... complete
7811ee1c425118:/app# curl icanhazip.com
2605:4c40:95:c0eb:0:f6fb:4b6b:1



```

---


after allocating egress IP
```sh
❯ FLY_API_TOKEN=$FLY_IITKGP_TOKEN  fly  machine egress-ip allocate 7811ee1c425118
? Looks like you're allocating a static egress (outgoing) IP. This is an advanced feature, and is not needed by most apps.
Are you sure this is what you want? Yes
Allocated egress IPs for machine 7811ee1c425118:
IPv4: 209.71.80.86
IPv6: 2a09:8280:e617::56:ea:0


```

https://community.fly.io/t/egress-ip-not-reflecting-even-after-using-the-command/23041

----


