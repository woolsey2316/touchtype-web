/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Container, Link, Typography } from "@mui/joy";
import type { JSX } from "react";
import { usePageEffect } from "../core/page";

const appName = import.meta.env.VITE_APP_NAME;
const appOrigin = import.meta.env.VITE_APP_ORIGIN;

/**
 * Generated by https://getterms.io
 */
export const Component = function Terms(): JSX.Element {
  usePageEffect({ title: "Terms of Use" });

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: (x: { spacing: (arg0: number) => string }) => x.spacing(3),
        marginBottom: (x: { spacing: (arg0: number) => string }) =>
          x.spacing(3),
      }}
    >
      <Typography level="h1" gutterBottom>
        Terms of Service
      </Typography>
      <Typography gutterBottom>
        These Terms of Service govern your use of the website located at{" "}
        <Link href={appOrigin}>{appOrigin}</Link> and any related services
        provided by {appName}.
      </Typography>
      <Typography gutterBottom>
        By accessing <Link href={appOrigin}>{appOrigin}</Link>, you agree to
        abide by these Terms of Service and to comply with all applicable laws
        and regulations. If you do not agree with these Terms of Service, you
        are prohibited from using or accessing this website or using any other
        services provided by {appName}.
      </Typography>
      <Typography gutterBottom>
        We, {appName}, reserve the right to review and amend any of these Terms
        of Service at our sole discretion. Upon doing so, we will update this
        page. Any changes to these Terms of Service will take effect immediately
        from the date of publication.
      </Typography>
      <Typography gutterBottom>
        These Terms of Service were last updated on 28 February 2021.
      </Typography>
      <Typography level="h2" gutterBottom>
        Limitations of Use
      </Typography>
      <Typography gutterBottom>
        By using this website, you warrant on behalf of yourself, your users,
        and other parties you represent that you will not:
      </Typography>
      <ol>
        <li>
          modify, copy, prepare derivative works of, decompile, or reverse
          engineer any materials and software contained on this website;
        </li>
        <li>
          remove any copyright or other proprietary notations from any materials
          and software on this website;
        </li>
        <li>
          transfer the materials to another person or “mirror” the materials on
          any other server;
        </li>
        <li>
          knowingly or negligently use this website or any of its associated
          services in a way that abuses or disrupts our networks or any other
          service {appName} provides;
        </li>
        <li>
          use this website or its associated services to transmit or publish any
          harassing, indecent, obscene, fraudulent, or unlawful material;
        </li>
        <li>
          use this website or its associated services in violation of any
          applicable laws or regulations;
        </li>
        <li>
          use this website in conjunction with sending unauthorized advertising
          or spam;
        </li>
        <li>
          harvest, collect, or gather user data without the user’s consent; or
        </li>
        <li>
          use this website or its associated services in such a way that may
          infringe the privacy, intellectual property rights, or other rights of
          third parties.
        </li>
      </ol>
      <Typography level="h2" gutterBottom>
        Intellectual Property
      </Typography>
      <Typography gutterBottom>
        The intellectual property in the materials contained in this website are
        owned by or licensed to {appName} and are protected by applicable
        copyright and trademark law. We grant our users permission to download
        one copy of the materials for personal, non-commercial transitory use.
      </Typography>
      <Typography gutterBottom>
        This constitutes the grant of a license, not a transfer of title. This
        license shall automatically terminate if you violate any of these
        restrictions or the Terms of Service, and may be terminated by {appName}
        at any time.
      </Typography>
      <Typography level="h2" gutterBottom>
        Liability
      </Typography>
      <Typography gutterBottom>
        Our website and the materials on our website are provided on an
        &lsquo;as is&rsquo; basis. To the extent permitted by law, {appName}{" "}
        makes no warranties, expressed or implied, and hereby disclaims and
        negates all other warranties including, without limitation, implied
        warranties or conditions of merchantability, fitness for a particular
        purpose, or non-infringement of intellectual property, or other
        violation of rights.
      </Typography>
      <Typography gutterBottom>
        In no event shall {appName} or its suppliers be liable for any
        consequential loss suffered or incurred by you or any third party
        arising from the use or inability to use this website or the materials
        on this website, even if {appName} or an authorized representative has
        been notified, orally or in writing, of the possibility of such damage.
      </Typography>
      <Typography gutterBottom>
        In the context of this agreement, &ldquo;consequential loss&rdquo;
        includes any consequential loss, indirect loss, real or anticipated loss
        of profit, loss of benefit, loss of revenue, loss of business, loss of
        goodwill, loss of opportunity, loss of savings, loss of reputation, loss
        of use and/or loss or corruption of data, whether under statute,
        contract, equity, tort (including negligence), indemnity, or otherwise.
      </Typography>
      <Typography gutterBottom>
        Because some jurisdictions do not allow limitations on implied
        warranties, or limitations of liability for consequential or incidental
        damages, these limitations may not apply to you.
      </Typography>
      <Typography level="h2" gutterBottom>
        Accuracy of Materials
      </Typography>
      <Typography gutterBottom>
        The materials appearing on our website are not comprehensive and are for
        general information purposes only. {appName} does not warrant or make
        any representations concerning the accuracy, likely results, or
        reliability of the use of the materials on this website, or otherwise
        relating to such materials or on any resources linked to this website.
      </Typography>
      <Typography level="h2" gutterBottom>
        Links
      </Typography>
      <Typography gutterBottom>
        {appName} has not reviewed all of the sites linked to its website and is
        not responsible for the contents of any such linked site. The inclusion
        of any link does not imply endorsement, approval, or control by
        {appName} of the site. Use of any such linked site is at your own risk
        and we strongly advise you make your own investigations with respect to
        the suitability of those sites.
      </Typography>
      <Typography level="h2" gutterBottom>
        Right to Terminate
      </Typography>
      <Typography gutterBottom>
        We may suspend or terminate your right to use our website and terminate
        these Terms of Service immediately upon written notice to you for any
        breach of these Terms of Service.
      </Typography>
      <Typography level="h2" gutterBottom>
        Severance
      </Typography>
      <Typography gutterBottom>
        Any term of these Terms of Service which is wholly or partially void or
        unenforceable is severed to the extent that it is void or unenforceable.
        The validity of the remainder of these Terms of Service is not affected.
      </Typography>
      <Typography level="h2" gutterBottom>
        Governing Law
      </Typography>
      <Typography gutterBottom>
        These Terms of Service are governed by and construed in accordance with
        the laws of United States. You irrevocably submit to the exclusive
        jurisdiction of the courts in that State or location.
      </Typography>
    </Container>
  );
};
