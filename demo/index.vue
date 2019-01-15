<template>
    <div>
        <BackButton/>
        <h2>{{ coinName.toUpperCase() }} - Change Password</h2>
        <div class="app-content-main">
            <a-form :autoFormCreate="(form)=>{this.form = form}">
                <a-form-item
                    label="Private Key Location"
                    fieldDecoratorId="storage"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please select your private key storage directory!' }]}"
                >
                    <FileDirSelect
                        placeholder="Please select a location for private key storage."
                        ops="dir"
                        @select="onSelectDir"
                    ></FileDirSelect>
                </a-form-item>
                <a-form-item
                    label="Old Password"
                    fieldDecoratorId="oldPwd"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your old password!' }]}"
                >
                    <a-input
                        type="password"
                        placeholder="Please input your old password"
                    ></a-input>
                </a-form-item>
                <a-form-item
                    label="New Password"
                    fieldDecoratorId="newPwd"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your new password!' }]}"
                >
                    <a-input
                        type="password"
                        placeholder="Please input your new password"
                    />
                </a-form-item>
                <a-form-item
                    label="Confirm Password"
                    fieldDecoratorId="confirmPwd"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input new password again!' }]}"
                >
                    <a-input
                        type="password"
                        placeholder="Please input new password again"
                    />
                </a-form-item>
                <a-form-item>
                    <a-button
                        class="fr"
                        :loading="loading"
                        @click="submit"
                        type="primary"
                    >Submit</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>